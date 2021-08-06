//
// Copyright © 2020 Province of British Columbia
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
import _ from 'lodash';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';

import { useEffect } from 'react';
import { Milestone, MilestoneStatus } from '../../types';
import { validateMilestone } from '../../utils/validationSchema';
import theme from '../Theme';

const useStyles = makeStyles({
  [MilestoneStatus.Green]: {
    color: theme.palette.success.dark,
  },
  [MilestoneStatus.Yellow]: {
    color: theme.palette.warning.main,
  },
  [MilestoneStatus.Red]: {
    color: theme.palette.secondary.main,
  },
  [MilestoneStatus.Completed]: {
    color: theme.palette.primary.main,
  },
  [MilestoneStatus.NotStarted]: {
    color: theme.palette.grey['500'],
  },
});

type Props = {
  milestone: Milestone;
  onChange: (milestone: Milestone) => void;
  onValidation: (valid: boolean) => void;
};

/**
 * Milestone item in the edit-report step 5
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const ReportMilestoneItem = (props: Props) => {
  const { milestone, onChange, onValidation } = props;
  const { name, start, estimatedEnd } = milestone;

  const classes = useStyles();

  // const initialValues = _.cloneDeep({ ...milestone, start: new Date(start), estimatedEnd: new Date(estimatedEnd) });
  const initialValues = _.cloneDeep(milestone);

  const formik = useFormik({
    initialValues,
    validationSchema: validateMilestone,
    onSubmit: values => {
      try {
        validateMilestone.validateSync(values);
        onChange(values);
        onValidation(true);
      } catch {
        onValidation(false);
      }
    },
  });

  const {
    errors,
    touched,
    isValid,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setTouched,
  } = formik;

  const defaultStartDate = start || null;
  const [startDate, setStartDate] = React.useState(defaultStartDate);
  const defaultEndDate = estimatedEnd ? new Date(estimatedEnd) : null;
  const [targetCompletionDate, setTargetCompletionDate] = React.useState(defaultEndDate);

  // report validation to parent
  useEffect(() => {
    onValidation(isValid);
    // eslint-disable-next-line
  }, [isValid]);

  useEffect(() => {
    // initial validation
    const allTouched = Object.keys(values).reduce((a, c) => ({ ...a, [c]: true }), {});
    setTouched(allTouched);
    return () => {
      handleSubmit();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h6" align="left">
        {name}
      </Typography>
      <form>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box maxWidth="160px">
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="start"
                name="start"
                label="Start Date"
                value={startDate}
                onChange={value => {
                  setStartDate(value);
                  formik.setFieldValue('start', value.toLocaleString());
                }}
                onBlur={handleBlur}
                error={touched.start && Boolean(errors.start)}
                helperText={touched.start && errors.start}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="estimatedEnd"
                name="estimatedEnd"
                label="Planned Finish Date"
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
          <Box maxWidth="160px" mx={5}>
            <FormControl margin="normal" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                fullWidth
                labelId="status-label"
                id="status"
                name="status"
                value={values.status}
                onChange={e => {
                  handleChange(e);
                  setFieldValue('status', e.target.value);
                }}
                onBlur={handleBlur}
                className={classes[values.status]}
              >
                {Object.entries(MilestoneStatus)
                  .filter(([, value]) => typeof value === 'string')
                  .map(([key, value]) => (
                    <MenuItem value={+key} key={key}>
                      {value}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="progress"
                name="progress"
                label="Progress (%)"
                type="number"
                margin="normal"
                variant="outlined"
                size="small"
                value={values.progress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.progress && Boolean(errors.progress)}
                helperText={touched.progress && errors.progress}
              />
            </FormControl>
          </Box>
          <Box width={3 / 4} pt={2}>
            <TextField
              id="comments"
              label="Comments"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              margin="normal"
              value={values.comments}
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

export default ReportMilestoneItem;
