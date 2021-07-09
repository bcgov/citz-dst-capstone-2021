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
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Ministries } from '../../constants';
import useApi from '../../utils/api';
import { validateNewProject } from '../../utils/validationSchema';

const ProjectContactsForm: React.FC = () => {
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
    },
    validationSchema: validateNewProject,
    onSubmit: (values) => {
      const {} = values;
      return api.
    }
  });
*/
  const handleSubmit = () => {
    alert('TODO: Handle submit');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center">
        Project Contacts
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="projectSponsor"
          name="projectSponsor"
          label="Project Sponsor"
          type="text"
          margin="normal"
        />
        <TextField
          fullWidth
          id="projectManager"
          name="projectManager"
          label="Project Manager"
          type="text"
          margin="normal"
          multiline
        />
        <TextField
          fullWidth
          id="financialContact"
          name="financialContact"
          label="Financial Contact"
          type="text"
          margin="normal"
        />
      </form>
    </Container>
  );
};

export default ProjectContactsForm;
