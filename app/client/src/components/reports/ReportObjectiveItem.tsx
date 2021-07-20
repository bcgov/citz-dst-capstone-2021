//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import * as React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import _ from 'lodash';

import { useEffect } from 'react';
import { Objective, Status } from '../../types';
import { validateObjective } from '../../utils/validationSchema';
import theme from '../Theme';

const useStyles = makeStyles({
  [Status.Green]: {
    color: theme.palette.success.dark,
  },
  [Status.Yellow]: {
    color: theme.palette.warning.main,
  },
  [Status.Red]: {
    color: theme.palette.secondary.main,
  },
});

type Props = {
  objective: Objective;
  onChange: (objective: Objective) => void;
  onValidation: (valid: boolean) => void;
};
const ReportObjectiveItem = (props: Props) => {
  const { objective, onChange, onValidation } = props;
  const { name, description, estimatedEnd } = objective;

  const classes = useStyles();

  const initialValues = _.cloneDeep(objective);

  const formik = useFormik({
    initialValues,
    validationSchema: validateObjective,
    onSubmit: values => {
      try {
        validateObjective.validateSync(values);
        onChange(values);
        onValidation(true);
      } catch {
        onValidation(false);
      }
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur, setTouched } =
    formik;

  const defaultEndDate = estimatedEnd ? new Date(estimatedEnd) : null;
  const [targetCompletionDate, setTargetCompletionDate] = React.useState(defaultEndDate);

  useEffect(() => {
    onValidation(isValid);
    // eslint-disable-next-line
  }, [isValid]);

  useEffect(() => {
    const allTouched = Object.keys(values).reduce((a, c) => ({ ...a, [c]: true }), {});
    setTouched(allTouched);
    return () => {
      handleSubmit();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center">
        <Typography variant="h6" align="left">
          {name}
        </Typography>
        <Typography variant="subtitle2" style={{ marginLeft: '16px' }}>
          {description}
        </Typography>
      </Box>
      <form>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <FormControl margin="normal" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                fullWidth
                labelId="status-label"
                id="status"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                className={classes[values.status]}
              >
                {Object.entries(Status)
                  .filter(([, value]) => typeof value === 'string')
                  .map(([key, value]) => (
                    <MenuItem value={+key} key={key}>
                      {value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="estimatedEnd"
                name="estimatedEnd"
                label="Target Completion Date"
                value={targetCompletionDate}
                onChange={value => {
                  setTargetCompletionDate(value);
                  formik.setFieldValue('estimatedEnd', value.toLocaleString());
                }}
                onBlur={handleBlur}
                error={touched.estimatedEnd && Boolean(errors.estimatedEnd)}
                helperText={touched.estimatedEnd && errors.estimatedEnd}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box width={3 / 4} pl={5} pt={2}>
            <TextField
              id="comments"
              name="comments"
              value={values.comments}
              label="Comments"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.comments && Boolean(errors.comments)}
              helperText={touched.comments && errors.comments}
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default ReportObjectiveItem;
