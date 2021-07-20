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
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Box, Button, Container, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { login } from '../actions';
import { validateLogin } from '../utils/validationSchema';

interface LoginProps {
  login: any;
}

const LoginForm: React.FC<LoginProps> = props => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateLogin,
    onSubmit: values => {
      props.login(values).then(() => {
        history.push('/');
      });
    },
  });

  const { errors, touched, isValid, values, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box m={4}>
          <Typography variant="h5" align="center">
            Sign In
          </Typography>
        </Box>
        <Box p={4}>
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
          <Link to="/signup">Sign Up</Link>
        </Box>
      </form>
    </Container>
  );
};

export default connect(null, { login })(LoginForm);
