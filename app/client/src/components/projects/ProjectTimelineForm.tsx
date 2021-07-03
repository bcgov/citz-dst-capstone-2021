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
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { useHistory } from 'react-router-dom';
import useApi from '../../utils/api';
import { validateNewProject } from '../../utils/validationSchema';

const ProjectTimelineForm: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleNewMilestone = () => {
    alert('TODO: implement milestone modal');
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center">
        Project Timeline Information
      </Typography>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="completionDate"
          label="Estimated Completion Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <FormControl margin="normal" fullWidth>
        <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={handleNewMilestone}>
          Add New Milestone
        </Button>
      </FormControl>
    </Container>
  )
};

export default ProjectTimelineForm;
