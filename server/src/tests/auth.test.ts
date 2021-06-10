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
import { Role } from '@interfaces/roles.interface';
import UserService from '@services/users.service';
import AuthService from '@services/auth.service';
import { User } from '@/interfaces/users.interface';

const testUser = {
  email: 'mary@example.com',
  firstName: 'Mary',
  lastName: 'Mulnch',
  password: 'q1wK2Oe3r4!',
  title: 'Finance Analyst',
  ministry: 'CITZ',
  role: Role.User,
  active: false,
};

const authRoute = new AuthRoute();
const app = new App([authRoute]);
const authUrl = authRoute.resource ? `${app.api_root}/${authRoute.resource}` : app.api_root;
const userSvc = new UserService();

afterAll(async () => {
  await userSvc
    .findUserByEmail(testUser.email)
    .then(user => userSvc.deleteUser(user.id))
    .then(() => app.stop());
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('allows a user to sign up', async () => {
      return request(app.getServer()).post(`${authUrl}/signup`).send(testUser).expect(201);
    });
  });

  describe('[POST] /login', () => {
    it('authenticates user and set auth cookie', done => {
      const userData = _.pick(testUser, ['email', 'password']);
      request(app.getServer())
        .post(`${authUrl}/login`)
        .send(userData)
        .expect(200)
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.body.user.id).toBeDefined();
          done();
        });
    });
  });

  describe('[POST] /logout', () => {
    it('logouts and remove auth cookie', () => {
      return userSvc
        .findUserByEmail(testUser.email)
        .then(user => {
          expect(user).toBeDefined();
          const data = { id: user.id };
          return AuthService.createToken(data as User, 600);
        })
        .then(({ token }) => {
          expect(token).toBeDefined();
          return request(app.getServer())
            .post(`${authUrl}/logout`)
            .set('Cookie', [`token=${token}`])
            .send(testUser)
            .expect(200);
        });
    });
  });
});
