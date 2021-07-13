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
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import _ from 'lodash';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';

import { Milestone, MilestoneStatus } from '../../types';
import { validateMilestone } from '../../utils/validationSchema';

type Props = {
  milestone: Milestone;
};
const ReportMilestoneItem = (props: Props) => {
  const { milestone } = props;

  const initialValues = _.cloneDeep(milestone);

  const formik = useFormik({
    initialValues,
    validationSchema: validateMilestone,
    onSubmit: (values) => {
      alert('not implemented');
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

  const [targetCompletionDate, setTargetCompletionDate] = React.useState('');

  return (
    <>
      <Typography variant="h6" align="left">
        Milestone 1
      </Typography>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="start"
              name="start"
              label="Start Date"
              value={targetCompletionDate}
              onChange={(value) => {
                setTargetCompletionDate(value);
                formik.setFieldValue('start', value.toISODate());
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="start"
              name="start"
              label="Planned Finish Date"
              value={targetCompletionDate}
              onChange={(value) => {
                setTargetCompletionDate(value);
                formik.setFieldValue('start', value.toISODate());
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Box>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select labelId="status-label" id="status" fullWidth>
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
            />
          </FormControl>
        </Box>
        <Box width={3 / 4} pl={5} pt={2}>
          <TextField
            id="comments"
            label="Comments"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Box>
      </Box>
    </>
  );
};

export default ReportMilestoneItem;
