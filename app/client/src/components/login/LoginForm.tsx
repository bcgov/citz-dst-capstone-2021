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
import getValidator from '../../utils/getValidator';
import FormSubtitle from '../common/UI/FormSubtitle';
import FormTitle from '../common/UI/FormTitle';
import TextInput from '../common/UI/TextInput';
import useRegistryApi from "../../hooks/useRegistryApi";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";

const LoginForm: React.FC = (props) => {
  const validator = getValidator();
  // @ts-ignore
  //const required = (value) => (value ? undefined : 'Required');
  //const { ministry = [], cluster = [] } = props;

  const history = useHistory();
  const api = useRegistryApi();

  const handleLogin = (formData: any) => {
    api.login(formData).then(data => {
      history.push('/');
      console.log(data);
    }).catch(e => {
      console.log(e);
    });
  }

  return (
    <Form onSubmit={handleLogin}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <FormTitle>Log In</FormTitle>
          <FormSubtitle>
            Please enter your username and password.
          </FormSubtitle>
          <Flex flexDirection="column">
            <Label htmlFor="email">Email</Label>
            <Field<string>
              name="email"
              component={TextInput}
              placeholder="Email"
              validate={validator.mustBeValidEmail}
            />
          </Flex>
          <Flex flexDirection="column">
            <Label htmlFor="password">Password</Label>
            <Field
              name="password"
              component={TextInput}
              placeholder=""
            />
          </Flex>
          <button type="submit">Login</button>
        </form>
      )}
    </Form>
  );
};

export default LoginForm;
