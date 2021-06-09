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
import App from '@/app';
import UsersRoute from '@routes/users.route';
import { Role } from '@interfaces/roles.interface';
import UserService from '@services/users.service';
import AuthService from '@services/auth.service';

const admin = {
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'Istrator',
  password: 'q1wK2Oe3r4!',
  title: 'System Administrator',
  ministry: 'CITZ',
  role: Role.Admin,
  active: false,
};

const user = {
  email: 'mary@example.com',
  firstName: 'Mary',
  lastName: 'Mulnch',
  password: 'q1wK2Oe3r4!',
  title: 'Finance Analyst',
  ministry: 'CITZ',
  role: Role.User,
  active: false,
};

const usersRoute = new UsersRoute();
const app = new App([usersRoute]);
const userSvc = new UserService();
const authSvc = new AuthService();
const usersUrl = `${app.api_root}/${usersRoute.resource}`;

let token = '';

beforeAll(async () => {
  await userSvc
    .findUserByEmail(admin.email)
    .catch(() => userSvc.createUser(admin))
    .then(user => authSvc.createToken(user, 600))
    .then(tokenData => (token = tokenData.token));
});

afterAll(async () => {
  await app.stop();
});

describe('Testing Users', () => {
  describe('[POST] /users', () => {
    it('validates password complexity', done => {
      const userData = { ...user, password: '1234' };
      request(app.getServer())
        .post(usersUrl)
        .set('Cookie', [`token=${token}`])
        .send(userData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message.startsWith('password too weak')).toBeTruthy();
          done();
        });
    });
    it('validates the email format', done => {
      const userData = { ...user, email: 'example.com' };
      request(app.getServer())
        .post(usersUrl)
        .set('Cookie', [`token=${token}`])
        .send(userData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message.startsWith('email')).toBeTruthy();
          done();
        });
    });
    it('validates if role is enum', done => {
      const userData = { ...user, role: 'Unknown' };
      request(app.getServer())
        .post(usersUrl)
        .set('Cookie', [`token=${token}`])
        .send(userData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message.startsWith('role')).toBeTruthy();
          done();
        });
    });
    it('creates a user', () => {
      return userSvc
        .findUserByEmail(user.email)
        .then(user => {
          if (user) return userSvc.deleteUser(user.id);
        })
        .then(() => {
          return request(app.getServer())
            .post(`${usersUrl}`)
            .set('Cookie', [`token=${token}`])
            .send(user)
            .expect(201);
        });
    });
  });

  describe('[GET] /users', () => {
    it('response fineAll Users', async () => {
      return request(app.getServer())
        .get(usersUrl)
        .set('Cookie', [`token=${token}`])
        .expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', () => {
      return userSvc.findUserByEmail(admin.email).then(user => {
        return request(app.getServer())
          .get(`${usersUrl}/${user.id}`)
          .set('Cookie', [`token=${token}`])
          .expect(200);
      });
    });
  });

  describe('[PATCH] /users/:id', () => {
    it('updates User', () => {
      const userData = { ...user, role: Role.Admin };
      return userSvc.findUserByEmail(user.email).then(user => {
        request(app.getServer())
          .patch(`${usersUrl}/${user.id}`)
          .set('Cookie', [`token=${token}`])
          .send(userData)
          .expect(200);
      });
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('deletes User', () => {
      return userSvc.findUserByEmail(user.email).then(user => {
        return request(app.getServer())
          .delete(`${usersUrl}/${user.id}`)
          .set('Cookie', [`token=${token}`])
          .expect(200);
      });
    });
  });
});
