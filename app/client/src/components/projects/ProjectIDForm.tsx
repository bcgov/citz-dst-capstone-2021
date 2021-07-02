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
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import { validateNewProject } from '../../utils/validationSchema';

interface IProjectIDForm {
  projectName?: string;
  formik?: any;
}

const ProjectIDForm: React.FC<IProjectIDForm> = ( projectName, formik ) => {
  const history = useHistory();
  const api = useApi();

  // TODO: Complete validation

  /*
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
*/

  
  const handleSubmit = () => {
    alert('TODO: Handle submit');
  }


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
          value={projectName}
        />
        <TextField
          fullWidth
          id="projectDescription"
          name="projectDescription"
          label="Project Description"
          type="text"
          margin="normal"
          multiline
        />
        <FormControl margin="normal" fullWidth>
          <InputLabel>Ministry</InputLabel>
          <Select
            labelId="ministry-label"
            id="ministry"
            name="ministry"
            fullWidth
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
          id="programName"
          name="programName"
          label="Program Name"
          type="text"
          margin="normal"
        />
        <TextField
          fullWidth
          id="cpsIdentifier"
          name="cpsIdentifier"
          label="CPS Identifier"
          type="text"
          margin="normal"
        />
        <TextField
          fullWidth
          id="ministryProjectNumber"
          name="ministryProjectNumber"
          label="Ministry Project Number"
          type="text"
          margin="normal"
        />
      </form>
    </Container>
  )
};

  export default ProjectIDForm;