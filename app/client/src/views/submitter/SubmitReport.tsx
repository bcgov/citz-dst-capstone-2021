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
  FormControlLabel,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import LuxonUtils from '@date-io/luxon';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useHistory } from 'react-router-dom';

import { Ministries, SubmitReportSteps } from '../../constants';
import { Status, Objective, Milestone, MilestoneStatus } from '../../types';
import useApi from '../../utils/api';
import { validateReport } from '../../utils/validationSchema';
import utils from '../../utils';

// status summary trends
const StatusTrends = [
  {icon: <ArrowUpwardIcon />, trend: 'up'},
  {icon: <ArrowForwardIcon />, trend: 'steady'},
  {icon: <ArrowDownwardIcon />, trend: 'down'}
];

// temp test data to display KPIs
const testKPIs = [{
    name: "KPI Alpha",
    description: "Lorem ipsum dolor sit amet, consectetur...",
    unit: "$",
    baseline: 1200,
    target: 1600,
    targetDate: '2022/05/12',
    output: true,
    outcome: false
  }, {
    name: "KPI Beta",
    description: "Lorem ipsum dolor sit amet, consectetur...",
    unit: "min",
    baseline: 45,
    target: 20,
    targetDate: '2022/05/12',
    output: true,
    outcome: true
  }
];

const SubmitReport: React.FC = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const [targetCompletionDate, setTargetCompletionDate] = React.useState('');
  const [projectInfoConfirmed, setProjectInfoConfirmed] = React.useState(false);
  const steps = SubmitReportSteps;

  const formik = useFormik({
    initialValues: {
      start: '',
      objectives: {
        objective1: {
          targetCompletionDate: '',
        },
        objective2: {
          targetCompletionDate: '',
        },
      },
    },
    validationSchema: validateReport,
    onSubmit: (values) => {
      alert(values);
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

  const getStatusComponent = () => {
    return (
      <>
        <Typography variant="h6" align="left">
          Overall Project Status (TODO: use props
          )
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
              {Object.entries(Status)
                .filter(([, value]) => typeof value === 'string')
                .map(([key, value]) => (
                  <MenuItem value={key} key={key}>
                    {value}
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
      </>
    );
  };

  const getObjectiveComponent = () => {
    return (
      <>
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
              {Object.entries(MilestoneStatus)
                  .filter(([, value]) => typeof value === 'string')
                  .map(([key, value]) => (
                    <MenuItem value={key} key={key}>
                      {value}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="start"
              name="start"
              label="Target Completion Date"
              value={targetCompletionDate}
              onChange={(value) => {
                setTargetCompletionDate(value);
                formik.setFieldValue('start', value.toISODate());
              }}
              error={touched.objectives?.objective1?.targetCompletionDate && Boolean(errors.objectives?.objective1?.targetCompletionDate)}
              helperText={touched.objectives?.objective1?.targetCompletionDate && errors.objectives?.objective1?.targetCompletionDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
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

  const getMilestoneComponent = () => {
    return (
      <>
        <Typography variant="h6" align="left">
          Milestone 1
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
        >
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
              error={touched.objectives?.objective1?.targetCompletionDate && Boolean(errors.objectives?.objective1?.targetCompletionDate)}
              helperText={touched.objectives?.objective1?.targetCompletionDate && errors.objectives?.objective1?.targetCompletionDate}
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
              error={touched.objectives?.objective1?.targetCompletionDate && Boolean(errors.objectives?.objective1?.targetCompletionDate)}
              helperText={touched.objectives?.objective1?.targetCompletionDate && errors.objectives?.objective1?.targetCompletionDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Box>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              fullWidth
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

  const getKPIComponent = () => {
    return (
      <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box flexGrow={1}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h6">
            {testKPIs[0].name}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Target Completion Date - </strong>{testKPIs[0].targetDate}
          </Typography>
        </Box>
        <Typography variant="body1">
          {testKPIs[0].description}
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="subtitle1">
            <strong>Baseline - </strong>{testKPIs[0].unit + testKPIs[0].baseline}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Target - </strong>{testKPIs[0].unit + testKPIs[0].target}
          </Typography>
        </Box>
      </Box>
      <Box ml={4}>
        <TextField
          id="progress"
          name="progress"
          label={`Progress (${testKPIs[0].unit})`}
          type="number"
          margin="normal"
          variant="outlined"
        />
      </Box>
      </Box>
    );
  };
  const renderStep0 = () => {
    return (
      <>
        <p>TODO: Project Information</p>
        <FormControlLabel 
          control={
            <Checkbox
              checked={projectInfoConfirmed}
              onChange={(_, value) => {
                setProjectInfoConfirmed(value);
              }}
              name="project-info-confirmed"
              color="primary"
            />
          }
          label="I confirm that project information is current and accurate"
        />
      </>
    );
  };

  const renderStep1 = () => {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center">
          Status Summary
        </Typography>
        {getStatusComponent()}
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

  const renderStep3 = () => {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center">
          Business Case Objective Tracking
        </Typography>
        {getObjectiveComponent()}
      </Container>
    );
  };

  const renderStep4 = () => {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center">
          Key Milestone Status
        </Typography>
        {getMilestoneComponent()}
      </Container>
    );
  };

  const renderStep5 = () => {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center">
          Key Performance Indicators
        </Typography>
        {getKPIComponent()}
      </Container>
    );
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderStep0();
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
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

  // TODO: Implement this method to only allow the user to continue if they 
  // confirm that project information is correct.
  const isNextValid = (): boolean => {
    // return !(activeStep === 0 && projectInfoConfirmed);
    return !(activeStep === 0 ? projectInfoConfirmed : true);
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
    if (projectInfoConfirmed) {
      setActiveStep(step);
    } else {
      setActiveStep(0);
    }
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
      {/* TODO: (samara) figure out how to stop user from using stepper buttons to go to other sections when projectInfoConfirmed is false */}
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
                disabled={isNextValid()}
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