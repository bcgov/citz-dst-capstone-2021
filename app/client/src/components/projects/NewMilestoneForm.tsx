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
  FormControl,
  GridList,
  GridListTile,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { validateNewProject } from '../../utils/validationSchema';
import { Milestone, MilestoneStatus } from '../../types';

const NewMilestoneForm: React.FC<Milestone> = (props) => {
  const [startDate, setStartDate] = React.useState('');
  const [startDateInput, setStartDateInput] = React.useState('');
  const [estEndDate, setEstEndDate] = React.useState('');
  const [estEndDateInput, setEstEndDateInput] = React.useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      start: '',
      status: MilestoneStatus.Green,
      estimatedEnd: '',
      progress: 0,
      comments: '',
    },
    validationSchema: validateNewProject,
    onSubmit: () => {},
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
    <Box maxWidth="500px">
      <Box display="flex" justifyContent="center">
        <Typography variant="h5">Create New Milestone</Typography>
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
        <Box display="flex" justifyContent="space-between" my={1}>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="start"
              name="start"
              label={values.start ? ' ' : 'Start'}
              value={startDate}
              inputValue={startDateInput}
              onChange={(date, value) => {
                setStartDate(date);
                setStartDateInput(String(value || ''));
                formik.setFieldValue('start', date?.toISODate() || '');
              }}
              error={touched.start && Boolean(errors.start)}
              helperText={touched.start && errors.start}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="estimatedEnd"
              name="estimatedEnd"
              label={estEndDate ? ' ' : 'Planned Finish Date'}
              value={estEndDate}
              inputValue={estEndDateInput}
              onChange={(date, value) => {
                setEstEndDate(date);
                setEstEndDateInput(String(value || ''));
                formik.setFieldValue('estimatedEnd', date?.toISODate() || '');
              }}
              error={touched.estimatedEnd && Boolean(errors.estimatedEnd)}
              helperText={touched.estimatedEnd && errors.estimatedEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Box>
          <TextField
            fullWidth
            id="comments"
            name="comments"
            label="comments"
            multiline
            rows={3}
            value={values.comments}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.comments && Boolean(errors.comments)}
            helperText={touched.comments && errors.name}
          />
        </Box>
        <Box my={3}>
          <GridList cols={3} cellHeight={80}>
            <GridListTile cols={1}>
              <TextField
                fullWidth
                id="progress"
                name="progress"
                label="Progress"
                type="number"
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
                      <MenuItem value={key} key={key}>
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
            style={{ marginRight: '24px', width: '140px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '160px' }}
            disabled={!isValid}
          >
            Add Milestone
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewMilestoneForm;
