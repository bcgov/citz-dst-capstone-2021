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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { useHistory } from 'react-router-dom';

import { Role } from '../../types';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import { validateNewProject } from '../../utils/validationSchema';
import ProjectIDForm from '../../components/projects/ProjectIDForm';
import ProjectContactsForm from '../../components/projects/ProjectContactsForm';
import ProjectTimelineForm from '../../components/projects/ProjectTimelineForm';
import ProjectObjectivesForm from '../../components/projects/ProjectObjectivesForm';
import ProjectKPIsForm from '../../components/projects/ProjectKPIsForm';

// TODO: Move to constants file
const steps = ['Project Identification', 'Contacts', 'Timeline', 'Business Case Objectives', 'KPIs'];


const NewProjectForm: React.FC = () => {
  // Form functionality with formik & api
  const history = useHistory();
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      name: '',
      cpsIdentifier: '',
      projectNumber: '',
      description: '',
      ministry: '',
      program: '',
      sponsor: '',
      manager: '',
      financialContact: '',
      start: '',
      end: '',
      estimatedEnd: '',
      progress: 0,
      phase: '',
    },
    validationSchema: validateNewProject,
    onSubmit: (values) => {
      const { ...project } = values;
      // return null;
    }
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

  // const stepContent = [ <ProjectIDForm projectName={values.name} formik={formik}/>, <ProjectContactsForm />, <ProjectTimelineForm />, <ProjectObjectivesForm />, <ProjectKPIsForm /> ]
    // for the stepper
    const [activeStep, setActiveStep] = React.useState(0);

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

    // for date picker
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
      new Date('2014-08-18T21:11:54'),
    );
  
    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
    };
  
    const handleNewMilestone = () => {
      alert('TODO: implement milestone modal');
    }
  
    function getStepContent(step: number) {
      switch (step) {

        case 0:
          return (
            <Container maxWidth="sm">
              <Typography variant="h5" align="center">
                Project Identification
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Project Name"
                  type="text"
                  margin="normal"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Project Description"
                  type="text"
                  margin="normal"
                  multiline
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <FormControl margin="normal" fullWidth>
                  <InputLabel>Ministry</InputLabel>
                  <Select
                    labelId="ministry-label"
                    id="ministry"
                    name="ministry"
                    fullWidth
                    value={values.ministry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {Ministries.map((ministry) => (
                      <MenuItem value={ministry} key={ministry}>
                        {ministry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  id="program"
                  name="program"
                  label="Program Name"
                  type="text"
                  margin="normal"
                  value={values.program}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.program && Boolean(errors.program)}
                  helperText={touched.program && errors.program}
                />
                <TextField
                  fullWidth
                  id="cpsIdentifier"
                  name="cpsIdentifier"
                  label="CPS Identifier"
                  type="text"
                  margin="normal"
                  value={values.cpsIdentifier}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cpsIdentifier && Boolean(errors.cpsIdentifier)}
                  helperText={touched.cpsIdentifier && errors.cpsIdentifier}
                />
                <TextField
                  fullWidth
                  id="projectNumber"
                  name="projectNumber"
                  label="Ministry Project Number"
                  type="text"
                  margin="normal"
                  value={values.projectNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.projectNumber && Boolean(errors.projectNumber)}
                  helperText={touched.projectNumber && errors.projectNumber}
                />
              </form>
            </Container>
          );

        case 1:
          return (
            <Container maxWidth="sm">
              <Typography variant="h5" align="center">
                Project Contacts
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  id="sponsor"
                  name="sponsor"
                  label="Project Sponsor"
                  type="text"
                  margin="normal"
                  value={values.sponsor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.sponsor && Boolean(errors.sponsor)}
                  helperText={touched.sponsor && errors.sponsor}
                />
                <TextField
                  fullWidth
                  id="manager"
                  name="manager"
                  label="Project Manager"
                  type="text"
                  margin="normal"
                  value={values.manager}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.manager && Boolean(errors.manager)}
                  helperText={touched.manager && errors.manager}
                />
                <TextField
                  fullWidth
                  id="financialContact"
                  name="financialContact"
                  label="Financial Contact"
                  type="text"
                  margin="normal"
                  value={values.financialContact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.financialContact && Boolean(errors.financialContact)}
                  helperText={touched.financialContact && errors.financialContact}
                />
              </form>
            </Container>
          );

        case 2:
          return (
            <Container maxWidth="sm">
              <Typography variant="h5" align="center">
                Project Timeline Information
              </Typography>
              <form onSubmit={handleSubmit}>
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
              </form>
            </Container>
          );
        case 3:
          return (<ProjectObjectivesForm />);
        case 4:
          return (<ProjectKPIsForm />);
        default:
          return 'unknown step';
      }
    };

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
