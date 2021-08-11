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

/**
 * yup validation schemas
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import * as yup from 'yup';
import { parse, isDate } from 'date-fns';
import { Status, Trend } from '../types';

const email = yup.string().email('Invalid email').required('Required');
const password = yup
  .string()
  .required('Required')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Password must contain at least 8 characters, one uppercase, one number and one special case character',
  );

const name = yup.string().min(1, 'Too Short!').max(50, 'Too Long!').required('Required');

const progress = yup
  .number()
  .min(0, 'Progress cannot be less than 0')
  .max(100, 'Progress cannot be greater than 100');

const cpsIdentifier = yup
  .string()
  .length(11, 'CPS Identifier must be 11 Characters Long!')
  .required('Required');

const projectNumber = yup.string().min(2).max(10);
// .length(10, 'Project Number Must Be 10 Characters Long!');

const textField = yup.string().max(400, 'Too Long!');

const ministry = yup.string().required();

const parseDateString = (value: any, originalValue: any): Date | undefined => {
  if (!originalValue) return undefined;
  if (isDate(originalValue)) {
    return originalValue;
  }
  const d = new Date(originalValue);
  if (isDate(d)) return d;
  return parse(originalValue, 'yyyy-MM-dd', new Date());
};
const date = yup.date().transform(parseDateString);

// TODO: (Samara) update for valid budget dollars; ask if budget is measured in whole dollars
const dollars = yup.number();

export const validateLogin = yup.object({ email });

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

export const validateNewProject = yup.object({
  name,
  cpsIdentifier,
  projectNumber,
  description: textField,
  ministry,
  program: name,
  sponsor: name,
  manager: name,
  financialContact: name,
  start: date,
  end: date,
  estimatedEnd: date,
});

export const validateProjectIdentity = yup.object({
  name,
  cpsIdentifier,
  projectNumber,
  description: textField,
  ministry,
  program: name,
});

export const validateMilestone = yup.object({
  name,
  start: date.required(),
  estimatedEnd: date.min(yup.ref('start'), 'End date must be later than start').required(),
  progress,
  comments: yup.string(),
});

export const validateObjective = yup.object({
  name,
  description: textField,
  status: yup.number(),
  comments: yup.string().when('status', {
    is: (status: any) => status !== Status.Green,
    then: yup.string().required('You must enter comments when the status is not green'),
  }),
  estimatedEnd: date.required(),
});

export const validateKPI = yup.object({
  name,
  description: textField,
  comments: yup.string(),
  unit: yup.string().required(),
  value: yup.number().when(['baseline', 'target'], {
    is: (baseline: number, target: number) => target > baseline,
    then: yup.number().max(yup.ref('target')).min(yup.ref('baseline')),
    otherwise: yup.number().max(yup.ref('baseline')).min(yup.ref('target')),
  }),
  end: date.required(),
  target: yup
    .number()
    .test('not equal', 'baseline and target must not be equal', (value, context) => {
      return value !== context.parent.baseline;
    })
    .required(),
  baseline: yup.number().required(),
});

export const validateReport = yup.object({
  currentFYApprovedFunding: dollars,
  sittingInMinistry: dollars,
  JVdOCIO: dollars,
  currentFYForecastSpend: dollars,
  totalBudget: dollars,
  projectSpendPreviousFY: dollars,
  remainingFunding: dollars,
  estimatedTotalCost: dollars,
  tempDateValue: date,
});

export const validateReportStatus = yup.object({
  status: yup.mixed().oneOf(Object.values(Status)),
  comments: yup
    .string()
    .when('status', {
      is: (status: any) => status !== Status.Green,
      then: yup.string().required('You must enter comments when the status is not green'),
    })
    .when('trend', {
      is: (trend: any) => trend === Trend.Down,
      then: yup.string().required('You must enter comments when the trend is down'),
    }),
});

export const validateFinance = yup.object({
  // TODO: (Nick) Which restrictions can we apply?
  budget: yup.number().min(1).required(),
  estimatedTotalCost: yup.number().min(1),
});
