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
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormControl,
  GridList,
  GridListTile,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { validateMilestone } from '../../utils/validationSchema';
import { Milestone, MilestoneStatus } from '../../types';

const useStyles = makeStyles({
  button: {
    margin: '24px',
    width: '140px',
    textTransform: 'none',
  },
});

interface NewMilestoneFormProps {
  closeModal: (data: any) => void;
  milestone: Milestone | null;
}

const NewMilestoneForm: React.FC<NewMilestoneFormProps> = props => {
  const { closeModal, milestone } = props;

  const classes = useStyles();

  const defaultStartDate = milestone?.start ? new Date(milestone.start) : null;
  const [startDate, setStartDate] = React.useState<Date | null>(defaultStartDate);
  const defaultEndDate = milestone?.estimatedEnd ? new Date(milestone.estimatedEnd) : null;
  const [estEndDate, setEstEndDate] = React.useState<Date | null>(defaultEndDate);

  const cancel = () => {
    closeModal(null);
  };

  const initialValues = milestone
    ? _.cloneDeep(milestone)
    : {
        name: '',
        start: '',
        status: MilestoneStatus.Green,
        estimatedEnd: '',
        progress: 0,
        comments: '',
      };

  const formik = useFormik({
    initialValues,
    validationSchema: validateMilestone,
    onSubmit: values => {
      closeModal(values);
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <Container maxWidth="sm">
      <Paper variant="outlined">
        <Box maxWidth="560px" p={4}>
          <Box display="flex" justifyContent="center" my={3}>
            <Typography variant="h5">{milestone ? 'Edit' : 'Create New'} Milestone</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Milestone Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt={3} alignItems="center" minHeight="80px">
              <Box mr={2}>
                <KeyboardDatePicker
                  autoOk
                  size="small"
                  variant="inline"
                  inputVariant="outlined"
                  format="yyyy/MM/dd"
                  id="start"
                  name="start"
                  label="Start"
                  value={startDate}
                  error={touched.start && Boolean(errors.start)}
                  helperText={touched.start && errors.start}
                  onBlur={handleBlur}
                  onChange={date => {
                    formik.setTouched({ start: true });
                    if (date && !date.invalid) {
                      setStartDate(date);
                      formik.setFieldValue('start', date.toLocaleString());
                    } else {
                      setStartDate(null);
                      formik.setFieldValue('start', '');
                    }
                  }}
                />
              </Box>
              <Box ml={2}>
                <KeyboardDatePicker
                  autoOk
                  size="small"
                  variant="inline"
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                  id="estimatedEnd"
                  name="estimatedEnd"
                  label="Planned Finish Date"
                  value={estEndDate}
                  error={touched.estimatedEnd && Boolean(errors.estimatedEnd)}
                  helperText={touched.estimatedEnd && errors.estimatedEnd}
                  onBlur={handleBlur}
                  onChange={date => {
                    formik.setTouched({ estimatedEnd: true });
                    if (date && !date.invalid) {
                      setEstEndDate(date);
                      formik.setFieldValue('estimatedEnd', date.toLocaleString());
                    } else {
                      setStartDate(null);
                      formik.setFieldValue('estimatedEnd', '');
                    }
                  }}
                />
              </Box>
            </Box>
            <Box mt={2}>
              <TextField
                fullWidth
                multiline
                id="comments"
                name="comments"
                label="Comments"
                rows={3}
                value={values.comments}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.comments && Boolean(errors.comments)}
                helperText={touched.comments && errors.name}
              />
            </Box>
            <Box mt={3}>
              <GridList cols={3} cellHeight={80}>
                <GridListTile cols={1}>
                  <TextField
                    fullWidth
                    id="progress"
                    name="progress"
                    label="Progress"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={values.progress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.progress && Boolean(errors.progress)}
                    helperText={touched.progress && errors.progress}
                  />
                </GridListTile>
                <GridListTile cols={1} />
                <GridListTile cols={1}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      fullWidth
                      id="status"
                      name="status"
                      labelId="Status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                </GridListTile>
              </GridList>
            </Box>
            <Box display="flex" justifyContent="center">
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
                {milestone ? 'Update' : 'Add Milestone'}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewMilestoneForm;
