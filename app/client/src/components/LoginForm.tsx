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

import { Label } from '@rebass/forms';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { Flex } from 'rebass';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Container } from '@material-ui/core';
import FormTitle from './common/form/FormTitle';
import FormSubtitle from './common/form/FormSubTitle';
import TextInput from './common/form/TextInput';
import validator from '../utils/validator';
import { login } from '../actions';

interface LoginProps {
  login: any;
}

const LoginForm: React.FC<LoginProps> = (props) => {
  const history = useHistory();

  const handleLogin = (formData: any) => {
    props.login(formData).then(() => {
      history.push('/details');
      // return api.getProjects();
    });
  };

  return (
    <Container maxWidth="sm">
      <Form onSubmit={handleLogin}>
        {(formProps) => (
          <form onSubmit={formProps.handleSubmit}>
            <FormTitle>Log In</FormTitle>
            <FormSubtitle>Please enter your email and password.</FormSubtitle>
            <Flex flexDirection="column">
              <Label htmlFor="email">Email</Label>
              <Field<string>
                name="email"
                component={TextInput}
                placeholder="Email"
                validate={validator.mustBeValidEmail}
              />
            </Flex>
            <Flex flexDirection="column" style={{ margin: '24px 0' }}>
              <Label htmlFor="password">Password</Label>
              <Field
                name="password"
                component={TextInput}
                type="password"
                placeholder=""
              />
            </Flex>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Login
            </Button>
          </form>
        )}
      </Form>
    </Container>
  );
};

export default connect(null, { login })(LoginForm);
