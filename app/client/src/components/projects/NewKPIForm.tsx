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
  Container,
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
import { Kpi } from '../../types';
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
  kpi: Kpi | null;
}

/**
 * New KPI form using Formik
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const NewKPIForm: React.FC<NewKPIFormProps> = props => {
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
        target: 100,
        value: 0,
        end: null,
        outcome: false,
        output: false,
      };

  const formik = useFormik({
    initialValues,
    validationSchema: validateKPI,
    onSubmit: values => {
      closeModal({ ...values });
    },
  });

  const { errors, touched, isValid, values, setTouched, handleSubmit, handleChange, handleBlur } =
    formik;

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined">
        <Box maxWidth="560px" p={4}>
          <Box display="flex" justifyContent="center" my={3}>
            <Typography variant="h5">
              {kpi ? 'Edit' : 'Create'} Key Performance Indicator
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box my={1}>
              <TextField
                fullWidth
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
                size="small"
                id="baseline"
                name="baseline"
                label="Baseline Value"
                type="number"
                value={values.baseline}
                onChange={handleChange}
                onBlur={e => {
                  handleBlur(e);
                  const value = +e.target.value;
                  if (
                    (value < values.target &&
                      (value > values.value || values.value > values.target)) || // baseline = 10 target = 100 value = 0 or 1000, value => baseline)
                    (value > values.target &&
                      (value < values.value || values.value < values.target)) // baseline = 100 target = 10 value = 1000 or 0, value => baseline
                  ) {
                    formik.setFieldValue('value', value);
                  }
                }}
                error={touched.baseline && Boolean(errors.baseline)}
                helperText={touched.baseline && errors.baseline}
              />
              <TextField
                size="small"
                id="target"
                name="target"
                label="Target Value"
                type="number"
                value={values.target}
                onChange={handleChange}
                onBlur={e => {
                  handleBlur(e);
                  const value = +e.target.value;
                  if (
                    (value < values.baseline &&
                      (values.baseline < values.value || values.value < value)) || // decreasing target
                    (value > values.baseline &&
                      (values.baseline > values.value || values.value > value)) // increasing target
                  ) {
                    formik.setFieldValue('value', values.baseline);
                    // console.log('value => ', values.baseline);
                  }
                }}
                error={touched.target && Boolean(errors.target)}
                helperText={touched.target && errors.target}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={3}
              maxWidth="500px"
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
                error={touched.end && Boolean(errors.end)}
                helperText={touched.end && errors.end}
                onBlur={handleBlur}
                onChange={date => {
                  setTouched({ end: true });
                  if (date && !date.invalid) {
                    setEndDate(date);
                    formik.setFieldValue('end', date.toLocaleString());
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
                        onBlur={handleBlur}
                        id="output"
                        name="output"
                        color="primary"
                        size="small"
                      />
                    }
                    label="Output"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.outcome}
                        onChange={handleChange}
                        id="outcome"
                        name="outcome"
                        color="primary"
                        size="small"
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
                disabled={!values.name || !isValid}
                type="submit"
              >
                {kpi ? 'Update' : 'Add KPI'}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewKPIForm;
