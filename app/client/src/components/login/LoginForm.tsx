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
import { Field } from 'react-final-form';
import { Flex } from 'rebass';
import getValidator from '../../utils/getValidator';
import CheckboxInput from '../common/UI/CheckboxInput';
import FormSubtitle from '../common/UI/FormSubtitle';
import FormTitle from '../common/UI/FormTitle';
import SelectInput from '../common/UI/SelectInput';
import TextAreaInput from '../common/UI/TextAreaInput';
import TextInput from '../common/UI/TextInput';

// interface MinistryItem {
//   name: string;
//   code: string;
// }

// interface ClusterItem {
//   name: string;
// }

interface ICreateFormProjectProps {
  //ministry: Array<MinistryItem>;
  //cluster: Array<ClusterItem>;
}

const LoginFormProject: React.FC<ICreateFormProjectProps> = (props) => {
  const validator = getValidator();
  // @ts-ignore
  //const required = (value) => (value ? undefined : 'Required');
  //const { ministry = [], cluster = [] } = props;

  return (
    <div>
      <FormTitle>Log In</FormTitle>
      <FormSubtitle>
        Please enter your username and password.
      </FormSubtitle>
      <Flex flexDirection="column">
        <Label htmlFor="username">Username</Label>
        <Field<string>
          name="username"
          component={TextInput}
          placeholder="Username"
          validate={validator.mustBeValidName}
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
    </div>
  );
};

export default LoginFormProject;
