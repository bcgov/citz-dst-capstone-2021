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
  Modal,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Kpi, Milestone, Objective, User } from '../../types';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import { validateNewProject } from '../../utils/validationSchema';
import ProjectObjectivesStep from '../../components/projects/ProjectObjectivesStep';
import ProjectKPIsStep from '../../components/projects/ProjectKPIsStep';
import AutoCompleteField from '../../components/common/AutoCompleteField';
import utils from '../../utils';
import NewMilestoneForm from '../../components/projects/NewMilestoneForm';
import MilestoneItem from '../../components/projects/MilestoneItem';

// TODO: Move to constants file
const steps = [
  'Project Identification',
  'Contacts',
  'Timeline',
  'Business Case Objectives',
  'KPIs',
];

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const NewProjectForm: React.FC = () => {
  // Form functionality with formik & api
  const history = useHistory();
  const api = useApi();
  const classes = useStyles();

  // for the stepper
  const [activeStep, setActiveStep] = React.useState(0);

  // set users for Autocomplete options
  const [users, setUsers] = React.useState<User[]>([]);

  // set values for Autocomplete and KeyboardDatePicker.
  const [sponsor, setSponsor] = React.useState<User | null>(null);
  const [manager, setManager] = React.useState<User | null>(null);
  const [financialContact, setFinancialContact] = React.useState<User | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [estEndDate, setEstEndDate] = React.useState<Date | null>(null);

  const [milestones, setMilestones] = React.useState<Milestone[]>([]);
  const [objectives, setObjectives] = React.useState<Objective[]>([]);
  const [kpis, setKpis] = React.useState<Kpi[]>([]);

  React.useEffect(() => {
    api.getUsers().then(data => setUsers(data));
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
    onSubmit: values => {
      const data = { ...values, milestones, objectives, kpis };
      return api.createProject(data).then(() => {
        history.push('/projects');
      });
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur } = formik;

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

  // prepare modal windows
  const [openMilestone, setOpenMilestone] = React.useState(false);
  const openMilestoneModal = () => {
    setOpenMilestone(true);
  };

  const [cacheIndex, setCacheIndex] = React.useState(-1);
  const editMilestone = (index: number) => {
    return () => {
      if (index >= 0) {
        setCacheIndex(index);
        setOpenMilestone(true);
      }
    };
  };

  const deleteMilestone = (index: number) => {
    return () => {
      if (index >= 0) {
        milestones.splice(index, 1);
        setMilestones([...milestones]);
      }
    };
  };

  const handleMilestoneModal = (data: Milestone) => {
    setOpenMilestone(false);
    setCacheIndex(-1);
    if (!data) return;
    if (cacheIndex >= 0) {
      // update
      milestones.splice(cacheIndex, 1, data);
      setMilestones([...milestones]);
    } else {
      // add
      setMilestones([...milestones, data]);
    }
  };

  const handleObjectiveChange = (data: Objective[]) => {
    setObjectives([...data]);
  };

  const handleKpiChange = (data: Kpi[]) => {
    setKpis([...data]);
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
        return utils.isValidFormInput(values, errors, ['sponsor', 'manager', 'financialContact']);
      case 2:
        return utils.isValidFormInput(values, errors, ['start', 'estimatedEnd']);
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
            {Ministries.map(ministry => (
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
        <Box my={4}>
          <Typography variant="h5" align="center">
            Project Contacts
          </Typography>
        </Box>
        <AutoCompleteField<User>
          options={users}
          getLabel={user => `${user.firstName} ${user.lastName}`}
          onChange={(_, value) => {
            formik.setFieldValue('manager', value?.id);
            setManager(value);
          }}
          getOptionSelected={(item, current) => {
            return item.id === current.id;
          }}
          value={manager}
          renderInput={params => {
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
          getLabel={user => `${user.firstName} ${user.lastName}`}
          onChange={(_, value) => {
            formik.setFieldValue('sponsor', value?.id);
            setSponsor(value);
          }}
          getOptionSelected={(item, current) => {
            return item.id === current?.id;
          }}
          value={sponsor}
          renderInput={params => {
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
          getLabel={user => `${user.firstName} ${user.lastName}`}
          onChange={(_, value) => {
            formik.setFieldValue('financialContact', value?.id);
            setFinancialContact(value);
          }}
          getOptionSelected={(item, current) => {
            return item.id === current?.id;
          }}
          value={financialContact}
          renderInput={params => {
            return (
              <TextField
                {...params}
                fullWidth
                label="Financial Contact"
                margin="normal"
                onBlur={handleBlur}
                error={touched.financialContact && Boolean(errors.financialContact)}
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
        <Box my={4}>
          <Typography variant="h5" align="center">
            Project Timeline Information
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between" mb={4}>
          {/* TODO: (nick) Fix -> Warning: A component is changing an uncontrolled input to be controlled.
            This is likely caused by the value changing from undefined to a defined value, which should not happen. */}
          {/* TODO: (nick) Fix: it doesn't display errors like https://material-ui-pickers.dev/demo/datepicker */}
          <KeyboardDatePicker
            autoOk
            size="small"
            variant="inline"
            inputVariant="outlined"
            format="yyyy/MM/dd"
            id="start"
            name="start"
            label="Start Date"
            value={startDate}
            onChange={date => {
              if (date && !date.invalid) {
                setStartDate(date);
                formik.setFieldValue('start', date.toISODate());
              } else {
                setStartDate(null);
                formik.setFieldValue('start', '');
              }
            }}
          />
          <KeyboardDatePicker
            autoOk
            size="small"
            variant="inline"
            inputVariant="outlined"
            format="yyyy/MM/dd"
            id="estimatedEnd"
            name="estimatedEnd"
            label="Estimated Completion"
            value={estEndDate}
            onChange={date => {
              if (date && !date.invalid) {
                setEstEndDate(date);
                formik.setFieldValue('estimatedEnd', date.toISODate());
              } else {
                setEstEndDate(null);
                formik.setFieldValue('estimatedEnd', '');
              }
            }}
          />
        </Box>
        <Box my={2}>
          {milestones.map((milestone, index) => {
            return (
              <MilestoneItem
                deleteItem={deleteMilestone(index)}
                editItem={editMilestone(index)}
                milestone={milestone}
                key={milestone.name}
              />
            );
          })}
        </Box>
        <FormControl margin="normal" fullWidth>
          <Button color="primary" variant="contained" type="button" onClick={openMilestoneModal}>
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
        return <ProjectObjectivesStep data={objectives} onChange={handleObjectiveChange} />;
      case 4:
        return <ProjectKPIsStep data={kpis} onChange={handleKpiChange} />;
      default:
        return 'unknown step';
    }
  };

  return (
    <Container maxWidth="lg">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => {
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
          <Container style={{ maxWidth: '800px' }}>
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
      {/* TODO: (nick) Fix -> Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
Check the render method of `Unstable_TrapFocus`. */}
      <Modal disableEnforceFocus open={openMilestone} className={classes.modal}>
        <NewMilestoneForm milestone={milestones[cacheIndex]} closeModal={handleMilestoneModal} />
      </Modal>
    </Container>
  );
};

export default NewProjectForm;
