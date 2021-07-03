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
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { Role } from '../../types';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import { validateSignUp } from '../../utils/validationSchema';

function getSteps() {
  return ['Project Identification', 'Contacts', 'Timeline', 'Business Case Objectives', 'KPIs'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return '';
    case 1:
      return '';
    case 2:
      return '';
    case 3:
      return '';
    case 4:
      return '';
    default:
      return 'unknown step';
  }
}

const NewProjectForm: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <p>Look at me! A view for our new project form!</p>
    </Container>
  );
};

export default NewProjectForm;