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

import * as yup from 'yup';

const email = yup.string().email('Invalid email').required('Required');
const password = yup
  .string()
  .required('Required')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Password must contain at least 8 characters, one uppercase, one number and one special case character'
  );

const name = yup
  .string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required');

export const validateLogin = yup.object({ email, password });

export const validateSignUp = yup.object({
  lastName: name,
  firstName: name,
  email,
  title: name,
  password,
  passwordConfirm: yup
    .string()
    .test('password-match', "'Password must match'", (value, context) => {
      return context.parent.password === value;
    })
    .oneOf([yup.ref('password'), null], 'Password must match'),
  role: yup.string().required('Select a role'),
  ministry: yup.string().required('Select a ministry'),
});
