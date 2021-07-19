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
import { Box, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import _ from 'lodash';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { ReportStatus, Status, StatusType, Trend } from '../../types';
import { validateReportStatus } from '../../utils/validationSchema';
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
  bottomBorder: {
    borderBottom: 'solid 1px',
  },
});

type Props = {
  status: ReportStatus;
  onChange: (status: ReportStatus) => void;
  onValidation: (valid: boolean) => void;
};

// labels to use here based on StatusType defined in types.ts
const statusTypeLabels = {
  [StatusType.Overall]: 'Overall Status',
  [StatusType.Scope]: 'Scope',
  [StatusType.Budget]: 'Budget',
  [StatusType.Schedule]: 'Schedule',
  [StatusType.Other]: 'Other Issues or Risks',
};

// status summary trends
const trendIcons = [
  { icon: <ArrowUpwardIcon />, value: Trend.Up },
  { icon: <ArrowForwardIcon />, value: Trend.Steady },
  { icon: <ArrowDownwardIcon />, value: Trend.Down },
];

const ReportStatusItem = (props: Props) => {
  const { status, onChange, onValidation } = props;

  const classes = useStyles();

  const initialValues = _.cloneDeep(status);

  const formik = useFormik({
    initialValues,
    validationSchema: validateReportStatus,
    onSubmit: values => {
      try {
        validateReportStatus.validateSync(values);
        onChange(values);
        onValidation(true);
      } catch {
        onValidation(false);
      }
    },
  });

  const { errors, touched, values, isValid, handleChange, handleSubmit, handleBlur, setTouched } = formik;

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
    <Box p={2} className={status.type === StatusType.Overall ? classes.bottomBorder : ''}>
      <Typography variant="h6" align="left">
        {statusTypeLabels[status.type]}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              className={classes[values.status]}
            >
              {Object.entries(Status)
                .filter(([, value]) => typeof value === 'string')
                .map(([key, value]) => (
                  <MenuItem value={+key} key={key} className={classes[key]}>
                    {value}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Trend</InputLabel>
            <Select
              labelId="trend"
              id="trend"
              name="trend"
              value={values.trend}
              onChange={handleChange}
              onBlur={handleBlur}
              className={classes[values.trend]}
              fullWidth
            >
              {trendIcons.map(({ icon, value }) => (
                <MenuItem value={value} key={value}>
                  {icon}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box width="100%" pl={5} pt={2}>
          <TextField
            id="comments"
            label="Comments"
            name="comments"
            multiline
            rows={4}
            value={values.comments}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.comments && Boolean(errors.comments)}
            helperText={touched.comments && errors.comments}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportStatusItem;
