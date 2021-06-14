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

import request from 'supertest';
import _ from 'lodash';

import App from '@/app';
import AuthRoute from '@routes/auth.route';
import UserService from '@services/users.service';
import AuthService from '@services/auth.service';
import { User } from '@/interfaces/users.interface';
import UsersRoute from '@routes/users.route';

import { CreateUserDto } from '@dtos/users.dto';
import testData from './testData.json';

const { testUser } = testData;

const authRoute = new AuthRoute();
const usersRoute = new UsersRoute();
const app = new App([authRoute, usersRoute]);
const authUrl = authRoute.resource ? `${app.api_root}/${authRoute.resource}` : app.api_root;

beforeAll(async () => {
  const user = await UserService.findUserByEmail(testUser.email);
  if (user) {
    await UserService.deleteUser(user.id);
  }
});

afterAll(async () => {
  await UserService.findUserByEmail(testUser.email)
    .then(user => UserService.deleteUser(user.id))
    .then(() => app.stop());
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('allows a user to sign up', async () => {
      return request(app.getServer()).post(`${authUrl}/signup`).send(testUser).expect(201);
    });
  });

  describe('[POST] /login', () => {
    it('deny login with a wrong password', () => {
      const userData = { email: testUser.email, password: `${testUser.password}dirt` };
      return request(app.getServer()).post(`${authUrl}/login`).send(userData).expect(409);
    });

    it('authenticates user and set auth cookie', () => {
      const userData = _.pick(testUser, ['email', 'password']);
      return request(app.getServer()).post(`${authUrl}/login`).send(userData).expect(200);
    });

    it('updates password and login', async () => {
      // update user
      const userData = { ...testUser, password: `${testUser.password}2` } as CreateUserDto;
      const user = await UserService.findUserByEmail(userData.email);
      await UserService.updateUser(user.id, userData);
      // try login again
      const loginData = _.pick(userData, ['email', 'password']);
      return request(app.getServer()).post(`${authUrl}/login`).send(loginData).expect(200);
    });
  });

  describe('[POST] /logout', () => {
    it('logouts and remove auth cookie', async () => {
      // get a token
      const user = await UserService.findUserByEmail(testUser.email);
      expect(user).toBeDefined();
      const data = { id: user.id };
      const { token } = await AuthService.createToken(data as User, 600);
      return request(app.getServer())
        .post(`${authUrl}/logout`)
        .set('Cookie', [`token=${token}`])
        .send(testUser)
        .expect(200);
    });
  });
});
