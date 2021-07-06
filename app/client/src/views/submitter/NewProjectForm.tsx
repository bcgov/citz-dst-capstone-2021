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
  KeyboardDatePicker,
} from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { useHistory } from 'react-router-dom';
import { User } from '../../types';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import { validateNewProject } from '../../utils/validationSchema';
import ProjectObjectivesForm from '../../components/projects/ProjectObjectivesForm';
import ProjectKPIsForm from '../../components/projects/ProjectKPIsForm';
import AutoCompleteField from '../../components/common/AutoCompleteField';

import utils from '../../utils';

// TODO: Move to constants file
const steps = [
  'Project Identification',
  'Contacts',
  'Timeline',
  'Business Case Objectives',
  'KPIs',
];

const NewProjectForm: React.FC = () => {
  // Form functionality with formik & api
  const history = useHistory();
  const api = useApi();

  // for the stepper
  const [activeStep, setActiveStep] = React.useState(0);

  // set users for Autocomplete options
  const [users, setUsers] = React.useState<User[]>([]);

  // set values for Autocomplete and KeyboardDatePicker.
  const [sponsor, setSponsor] = React.useState<User | null>(null);
  const [manager, setManager] = React.useState<User | null>(null);
  const [financialContact, setFinancialContact] = React.useState<User | null>(
    null
  );
  const [startDate, setStartDate] = React.useState('');
  const [startDateInput, setStartDateInput] = React.useState('');
  const [estEndDate, setEstEndDate] = React.useState('');
  const [estEndDateInput, setEstEndDateInput] = React.useState('');

  React.useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      estimatedEnd: '',
    },
    validationSchema: validateNewProject,
    onSubmit: (values) => {
      api.createProject(values).then(() => {
        history.push('/projects');
      });
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

  const handleNewMilestone = () => {
    // eslint-disable-next-line no-alert
    alert('TODO: implement milestone modal');
  };

  const isNextValid = (): boolean => {
    switch (activeStep) {
      case 0:
        return utils.isValidFormInput(values, errors, [
          'name',
          'cpsIdentifier',
          'ministry',
          'program',
          'projectNumber',
        ]);
      case 1:
        return utils.isValidFormInput(values, errors, [
          'sponsor',
          'manager',
          'financialContact',
        ]);
      case 2:
        return utils.isValidFormInput(values, errors, [
          'start',
          'estimatedEnd',
        ]);
      default:
        return isValid;
    }
  };

  const renderStep0 = () => {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Project Identification
        </Typography>
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
        {/* TODO: (nick) resolve 'Warning: findDOMNode is deprecated in StrictMode'
        https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode */}
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
      </Container>
    );
  };

  const renderStep1 = () => {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Project Contacts
        </Typography>
        <AutoCompleteField<User>
          options={users}
          getLabel={(user) => `${user.firstName} ${user.lastName}`}
          onChange={(_, value) => {
            values.manager = value.id;
            setManager(value);
          }}
          getOptionSelected={(item, current) => {
            return item.id === current.id;
          }}
          value={manager}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                fullWidth
                label="Project Manager"
                margin="normal"
                onBlur={handleBlur}
                error={touched.manager && Boolean(errors.manager)}
                helperText={touched.manager && errors.manager}
              />
            );
          }}
        />
        <AutoCompleteField<User>
          options={users}
          getLabel={(user) => `${user.firstName} ${user.lastName}`}
          onChange={(_, value) => {
            values.sponsor = value?.id;
            setSponsor(value);
          }}
          getOptionSelected={(item, current) => {
            return item.id === current?.id;
          }}
          value={sponsor}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                fullWidth
                label="Project Sponsor"
                margin="normal"
                onBlur={handleBlur}
                error={touched.sponsor && Boolean(errors.sponsor)}
                helperText={touched.sponsor && errors.sponsor}
              />
            );
          }}
        />
        <AutoCompleteField<User>
          options={users}
          getLabel={(user) => `${user.firstName} ${user.lastName}`}
          onChange={(_, value) => {
            values.financialContact = value?.id;
            setFinancialContact(value);
          }}
          getOptionSelected={(item, current) => {
            return item.id === current?.id;
          }}
          value={financialContact}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                fullWidth
                label="Financial Contact"
                margin="normal"
                onBlur={handleBlur}
                error={
                  touched.financialContact && Boolean(errors.financialContact)
                }
                helperText={touched.financialContact && errors.financialContact}
              />
            );
          }}
        />
      </Container>
    );
  };

  const renderStep2 = () => {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5" align="center">
          Project Timeline Information
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt={3}
        >
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk
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
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <KeyboardDatePicker
              disableToolbar
              autoOk
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="estimatedEnd"
              name="estimatedEnd"
              label={estEndDate ? ' ' : 'Estimated Completion'}
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
        <FormControl margin="normal" fullWidth>
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={handleNewMilestone}
          >
            Add New Milestone
          </Button>
        </FormControl>
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
        return <ProjectObjectivesForm />;
      case 4:
        return <ProjectKPIsForm />;
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

export default NewProjectForm;
