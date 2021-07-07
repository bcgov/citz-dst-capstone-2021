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

const NewMilestoneForm: React.FC<NewMilestoneFormProps> = (props) => {
  const { closeModal, milestone } = props;

  const classes = useStyles();

  const defaultStartDate = milestone?.start || '';
  const defaultEndDate = milestone?.estimatedEnd || '';
  const [startDate, setStartDate] = React.useState(defaultStartDate);
  const [startDateInput, setStartDateInput] = React.useState(defaultStartDate);
  const [estEndDate, setEstEndDate] = React.useState(defaultEndDate);
  const [estEndDateInput, setEstEndDateInput] = React.useState(defaultEndDate);

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

  // TODO: (nick) FIXME: isValid doesn't work
  const validate = (): boolean => {
    return !!(isValid && values.name && values.start && values.estimatedEnd);
  };

  return (
    <Box minWidth="500px" style={{ backgroundColor: 'white', padding: '40px' }}>
      <Box display="flex" justifyContent="center" my={3}>
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
          <Box mr={2}>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                size="small"
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
          </Box>
          <Box>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                size="small"
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
            className={classes.button}
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!validate()}
            type="submit"
          >
            {milestone ? 'Update' : 'Add Milestone'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewMilestoneForm;
