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

import { Role } from '../types';
import { Ministries } from '../constants';
import useApi from '../utils/api';
import { validateSignUp } from '../utils/validationSchema';

/**
 * Sign up form using Formik
 * @author [SungHwan Park](shwpark612@gmail.com)
 */
const SigUpForm: React.FC = () => {
  const history = useHistory();
  const api = useApi();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      title: '',
      role: Role.User,
      ministry: '',
    },
    validationSchema: validateSignUp,
    onSubmit: values => {
      const { passwordConfirm, ...user } = values;
      return api.signup(user).then(() => {
        history.push('/login');
      });
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          margin="normal"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          margin="normal"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          margin="normal"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          margin="normal"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <TextField
          fullWidth
          id="passwordConfirm"
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          margin="normal"
          value={values.passwordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.passwordConfirm && Boolean(errors.passwordConfirm)}
          helperText={touched.passwordConfirm && errors.passwordConfirm}
        />
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Job Title"
          type="text"
          margin="normal"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.title && Boolean(errors.title)}
          helperText={touched.title && errors.title}
        />
        <FormControl margin="normal" fullWidth>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            fullWidth
            value={values.role}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {Object.keys(Role).map(role => (
              <MenuItem value={role} key={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <Box my={4}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={!isValid || !values.email}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SigUpForm;
