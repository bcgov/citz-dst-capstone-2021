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
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { Role } from '../../types';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import { validateSignUp } from '../../utils/validationSchema';

// this functions can be refactored out and can be passed into a stepper component as props to support quickly building additional forms.
function getSteps() {
  return ['Project Identification', 'Contacts', 'Timeline', 'Business Case Objectives', 'KPIs'];
}

// a little more thought should go into how to best refactor this component
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return 'TODO: project identification';
    case 1:
      return 'TODO: contacts';
    case 2:
      return 'TODO: timeline';
    case 3:
      return 'TODO: business case objectives';
    case 4:
      return 'TODO: KPIs';
    default:
      return 'unknown step';
  }
}

const NewProjectForm: React.FC = () => {

  // stepper code to refactor into it's own component once it's working
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    // TODO: Bounds checking
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // not required for current functionality but added since a reset is a reasonable feature to have.
  const handleReset = () => {
    setActiveStep(0);
  }

  return (
    <Container maxWidth="lg">

      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {}; // I don't think I need this
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography variant="h1">
              All steps complete!
              TODO: proper form conclusion layout
            </Typography>
          </div>
        ) : (
          <div>
            <div>
              {getStepContent(activeStep)}
            </div>
            <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            fontWeight={800}
            >
              <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={handleBack}>
                Back
              </Button>
              <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={handleNext}>
                Next
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Container>
  );
};

export default NewProjectForm;
