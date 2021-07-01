/**
 * Copyright © 2021 Province of British Columbia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// for class-transformer Type method
import 'reflect-metadata';

import UserService from '@services/users.service';
import { UserDTO } from '@dtos/users.dto';
import AuthService from '@services/auth.service';
import App from '@/app';
import ReportsRoute from '@routes/reports.route';
import testData from '@/tests/testData.json';

const reportsRoute = new ReportsRoute();
const app = new App([reportsRoute]);
const uri = `${app.api_root}/${reportsRoute.resource}`;

let token = '';
const { admin } = testData;

beforeAll(async () => {
  let user = await UserService.findUserByEmail(admin.email);
  if (!user) {
    user = await UserService.createUser(admin as UserDTO);
  }
  const tokenData = await AuthService.createToken(user, 600);
  token = tokenData.token;
});

afterAll(async () => {
  await app.stop();
});

// TODO: (nick) Reports test cases
describe('Testing reports', () => {
  describe.skip('Testing report general info', () => {
    it('[GET] /reports', () => {});
    it('[POST] /reports', () => {});
    it('[PATCH] /reports/id', () => {});
    it('[DELETE] /reports/id', () => {});
  });
  describe('Testing report milestones', () => {
    it('[GET] /reports/{id}/milestones', () => {});
    it('[POST] /reports/{id}/milestones', () => {});
    it('[PATCH] /reports/{id}/milestones/{mid}', () => {});
    it('[DELETE] /reports/{id}/milestones/{mid}', () => {});
  });
});
