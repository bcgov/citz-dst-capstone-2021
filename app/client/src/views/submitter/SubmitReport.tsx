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
import { useHistory } from 'react-router-dom';

import { User } from '../../types';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import utils from '../../utils';

// TODO: (Samara) move to constants
const steps = [
  'Project Information',
  'Status Summary',
  'Financial Information',
  'Business Case Objective Tracking',
  'Key Milestone Status',
  'Key Performance Indicators'
];

const SubmitReport: React.FC = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <p>TODO: Project Information</p>;
      case 1:
        return <p>TODO: Status Summary</p>;
      case 2:
        return <p>TODO: Financial Information</p>;
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
      <Stepper nonLinear activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          // const stepProps: { completed?: boolean } = {};
          // const labelProps: { optional?: React.ReactNode } = {};

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