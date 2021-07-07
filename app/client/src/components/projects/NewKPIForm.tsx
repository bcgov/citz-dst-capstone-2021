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

import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import _ from 'lodash';
import { useFormik } from 'formik';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { KPI } from '../../types';
import { validateKPI } from '../../utils/validationSchema';

const useStyles = makeStyles({
  button: {
    marginRight: '24px',
    width: '140px',
    textTransform: 'none',
  },
});

interface NewKPIFormProps {
  closeModal: (data: any) => void;
  kpi: KPI | null;
}

const NewKPIForm: React.FC<NewKPIFormProps> = (props) => {
  const { closeModal, kpi } = props;
  const classes = useStyles();

  const defaultEndData = kpi?.end ? new Date(kpi.end) : null;
  const [endDate, setEndDate] = React.useState<Date | null>(defaultEndData);

  const cancel = () => closeModal(null);

  const initialValues = kpi
    ? _.cloneDeep(kpi)
    : {
        name: '',
        description: '',
        unit: '',
        baseline: 0,
        target: 0,
        end: null,
        outcome: false,
        output: false,
      };

  const formik = useFormik({
    initialValues,
    validationSchema: validateKPI,
    onSubmit: (values) => {
      closeModal(values);
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
  } = formik;

  return (
    <Paper variant="outlined">
      <Box minWidth="520px" style={{ backgroundColor: 'white' }} p={6}>
        <Box>
          <Box display="flex" justifyContent="center">
            <Typography variant="h5">
              Create Key Performance Indicator
            </Typography>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box my={3}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="name"
              name="name"
              label="KPI Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Box>
          <Box my={3}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id="description"
              name="description"
              label="KPI Description"
              type="text"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
          </Box>
          <Box my={3}>
            <TextField
              variant="outlined"
              size="small"
              id="unit"
              name="unit"
              label="KPI Unit"
              type="text"
              value={values.unit}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.unit && Boolean(errors.unit)}
              helperText={touched.unit && errors.unit}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" my={3}>
            <TextField
              variant="outlined"
              size="small"
              id="baseline"
              name="baseline"
              label="Baseline Value"
              type="number"
              value={values.baseline}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.baseline && Boolean(errors.baseline)}
              helperText={touched.baseline && errors.baseline}
            />
            <TextField
              variant="outlined"
              size="small"
              id="target"
              name="target"
              label="Target Value"
              type="text"
              value={values.target}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.target && Boolean(errors.target)}
              helperText={touched.target && errors.target}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            my={3}
          >
            <KeyboardDatePicker
              autoOk
              size="small"
              variant="inline"
              inputVariant="outlined"
              format="yyyy/MM/dd"
              id="end"
              name="end"
              label="Target Completion Date"
              value={endDate}
              onChange={(date) => {
                if (date && !date.invalid) {
                  setEndDate(date);
                  formik.setFieldValue('end', date.toISODate());
                } else {
                  setEndDate(null);
                  formik.setFieldValue('end', '');
                }
              }}
            />
            <Box>
              <Typography>KPI Classification</Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.output}
                      onChange={handleChange}
                      id="output"
                      name="output"
                    />
                  }
                  label="Output"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.output}
                      onChange={handleChange}
                      id="output"
                      name="output"
                    />
                  }
                  label="Outcome"
                />
              </FormGroup>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt={5}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!isValid}
              type="submit"
            >
              {kpi ? 'Update' : 'Add KPI'}
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export default NewKPIForm;