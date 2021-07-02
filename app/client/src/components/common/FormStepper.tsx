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
import {
  Box,
  Button,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';

interface IFormStepper {
  steps?: string[],
  stepContent?: any[] // this is temporary and will be factored out when implementing the form
}

const FormStepper: React.FC<IFormStepper> = (props) => {

    const [activeStep, setActiveStep] = React.useState(0);
    // const steps = getSteps();

    const {
      steps = [''],
      stepContent = [<p>Something went wrong.</p>]
    } = props;
  
    const handleNext = () => {
      // TODO: Bounds checking
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
      // TODO: Bounds checking
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    // not required for current functionality but added since a reset is a reasonable feature to have.
    const handleReset = () => {
      setActiveStep(0);
    }

  return (
    <Container maxWidth="lg">
      <Stepper activeStep={activeStep} alternativeLabel>
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
              {/* TODO: Better handling of step content passed into component */}
              {stepContent[activeStep]}
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
  )
};

export default FormStepper;
