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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useHistory } from 'react-router-dom';

import { User } from '../../types';
import { Ministries, ColorStatuses, SubmitReportSteps } from '../../constants';
import useApi from '../../utils/api';
import utils from '../../utils';

// status summary trends
export const StatusTrends = [
  {icon: <ArrowDownwardIcon />, trend: 'down'},
  {icon: <ArrowForwardIcon />, trend: 'steady'},
  {icon: <ArrowUpwardIcon />, trend: 'up'}
];

const SubmitReport: React.FC = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const steps = SubmitReportSteps;

  const renderStep1 = () => {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center">
          Status Summary
        </Typography>

        <Typography variant="h6" align="left">
          Overall Project Status
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
        <Box>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              fullWidth
            >
              {ColorStatuses.map((status) => (
                <MenuItem value={status.label} key={status.abbrev}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Trend</InputLabel>
            <Select
              labelId="trend-label"
              id="trend"
              fullWidth
            >
              {StatusTrends.map((trend) => (
                <MenuItem value={trend.trend} key={trend.trend}>
                  {trend.icon}
                </MenuItem>
              ))}
            </Select>
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
      </Container>
    );
  };

  const renderStep2 = () => {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center">
          Financial Information
        </Typography>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
          <Box width={1 / 2} m={5}>
            <Typography variant="h6" align="center">
              Current Fiscal Year
            </Typography>
            
            <TextField
              fullWidth
              id="current-fy-approved-funding"
              name="current-fy-approved-funding"
              label="Current FY Approved Funding"
              type="number"
              margin="normal"
              variant="outlined"
            />
            <Box>
              <Typography variant="subtitle1" align="left">
                Current FY Actuals
              </Typography>

              <TextField
                fullWidth
                id="sitting-in-ministry"
                name="sitting-in-ministry"
                label="Sitting in Ministry"
                type="number"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="jv-ocio"
                name="jv-ocio"
                label="JV'd to OCIO"
                type="number"
                margin="normal"
                variant="outlined"
              />

              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="subtitle1" align="left">
                  Current FY Actuals:
                </Typography>
                <Typography variant="subtitle1" align="right">
                  -
                </Typography>
              </Box>
            </Box>
            <TextField
              fullWidth
              id="current-fy-forecast-spend"
              name="current-fy-forecast-spend"
              label="Current Fiscal Year FY Forecasted Spend"
              type="number"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="variance-current-fy"
              name="variance-current-fy"
              label="Variance to Budget"
              type="number"
              margin="normal"
              variant="outlined"
            />
          </Box>
          <Box width={1 / 2} m={5}>
            <Typography variant="h6" align="center">
              Overall Project Information
            </Typography>

            <TextField
              fullWidth
              id="total-project-budget"
              name="total-project-budget"
              label="Total Project Budget"
              type="number"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="project-spend-previous-fy"
              name="project-spend-previous-fy"
              label="Project Spend to End of Previous FY"
              type="number"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="current-fy-forecasted-spend"
              name="current-fy-forecasted-spend"
              label="Current FY Full Year Forecasted Spend"
              type="number"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="funding-remaining"
              name="funding-remaining"
              label="Project Funding for Remaining FYs"
              type="number"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="estimated-total-cost"
              name="estimated-total-cost"
              label="Estimated Total Cost"
              type="number"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="variance-overall"
              name="variance-overall"
              label="Variance to Budget"
              type="number"
              margin="normal"
              variant="outlined"
            />
          </Box>
        </Box>
      </Container>
    );
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <p>TODO: Project Information</p>;
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return <p>TODO: Business Case Objective Tracking</p>;
      case 4:
        return <p>TODO: Key Milestone Status</p>;
      case 5:
        return <p>TODO: Key Performance Indicators</p>;
      default:
        return 'unknown step';
    }
  }

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return Object.keys(completed).length;
  };

  const allStepsCompleted = () => {
    return completedSteps() === steps.length;
  };

  // TODO: delete this when implementing formik
  const handleSubmit = () => {
    alert("This is a stub to be replaced with Formik functionality");
  };

  // TODO: Implement this method to only allow the user to continue if they 
  // confirm that project information is correct.
  const isNextValid = (): boolean => {
    return true;
  };

  const handleNext = () => {
    if (activeStep >= steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }

  return(
    <Container maxWidth="lg">
      {/* using a nonLinear stepper allows the user to click on the stepper labels and navigate to that section of the form */}
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {

          return (
            <Step key={label}>
              <StepButton onClick={handleStep(index)} completed={completed[index]}>
                {label}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {/* TODO: Better handling of step content passed into component */}
            {getStepContent(activeStep)}
          </div>
          <Container maxWidth="sm">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              fontWeight={800}
              my={3}
            >
              <Button
                color="primary"
                variant="contained"
                type="button"
                disabled={activeStep <= 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="contained"
                disabled={!isNextValid()}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Container>
        </form>
      </div>
    </Container>
  );
};

export default SubmitReport;