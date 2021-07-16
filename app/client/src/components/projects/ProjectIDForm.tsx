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
import { makeStyles } from '@material-ui/core/styles';

import { Ministries } from '../../constants';
import { validateProjectIdentity } from "../../utils/validationSchema";
import { Project } from '../../types';
import emitter from '../../events/Emitter';
import EventType from '../../events/Events';

const useStyles = makeStyles({
  button: {
    marginRight: '24px',
    width: '140px',
    textTransform: 'none',
  },
});

type Props = {
  project: Project;
};

const ProjectIDForm: React.FC<Props> = props => {
  const { project } = props;
  const classes = useStyles();

  const { name, cpsIdentifier, projectNumber, description, ministry, program } = project;

  const initialValues = {
    name,
    cpsIdentifier,
    projectNumber,
    description,
    ministry,
    program,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validateProjectIdentity,
    onSubmit: values => {
      emitter.emit(EventType.Project.UpdateIdentity, values);
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur } = formik;

  const cancel = () => {
    emitter.emit(EventType.Project.UpdateIdentity, null);
  };

  return (
    <Container maxWidth="sm">
      <Box p={3} bgcolor="white" boxShadow={5} borderRadius={4}>
        <Box my={3}>
          <Typography variant="h5" align="center">
            Project Identification
          </Typography>
        </Box>
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
              {Ministries.map(item => (
                <MenuItem value={item} key={item}>
                  {item}
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
          <Box display="flex" justifyContent="center" mt={5}>
            <Button variant="contained" color="primary" className={classes.button} onClick={cancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!isValid}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ProjectIDForm;
