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
import { validateNewProject } from '../../utils/validationSchema';
import FormStepper from '../../components/common/FormStepper';
import ProjectIDForm from '../../components/projects/ProjectIDForm';
import ProjectContactsForm from '../../components/projects/ProjectContactsForm';
import ProjectTimelineForm from '../../components/projects/ProjectTimelineForm';
import ProjectObjectivesForm from '../../components/projects/ProjectObjectivesForm';
import ProjectKPIsForm from '../../components/projects/ProjectKPIsForm';

// TODO: Move to constants file
const steps = ['Project Identification', 'Contacts', 'Timeline', 'Business Case Objectives', 'KPIs'];

/*
function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <h2>TODO: project identification</h2>;
    case 1:
      return <h2>TODO: contacts</h2>;
    case 2:
      return <h2>TODO: timeline</h2>;
    case 3:
      return <h2>TODO: business case objectives</h2>;
    case 4:
      return <h2>TODO: KPIs</h2>;
    default:
      return 'unknown step';
  }
};
*/

const NewProjectForm: React.FC = () => {
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

  const stepContent = [ <ProjectIDForm projectName={values.name} formik={formik}/>, <ProjectContactsForm />, <ProjectTimelineForm />, <ProjectObjectivesForm />, <ProjectKPIsForm /> ]

  return (
    <Container maxWidth="lg">
      <FormStepper steps={steps} stepContent={stepContent} />
    </Container>
  );
};

export default NewProjectForm;
