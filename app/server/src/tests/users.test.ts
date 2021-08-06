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

/**
 * Unit tests - APIs for {@link User}
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import request from 'supertest';

import App from '@/app';
import UsersRoute from '@routes/users.route';
import UserService from '@services/users.service';
import AuthService from '@services/auth.service';
import UserDTO from '@dtos/UserDTO';
import { Role } from '@interfaces/users.interface';
import testData from './testData.json';

const { admin, testUser } = testData;

const route = new UsersRoute();
const app = new App([route]);
const uri = `${app.api_root}/${route.resource}`;

let token = '';

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

describe('Testing Users', () => {
  describe('[POST] /users', () => {
    it('validates password complexity', done => {
      const userData = { ...testUser, password: '1234' };
      request(app.getServer())
        .post(uri)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message.startsWith('password too weak')).toBeTruthy();
          done();
        });
    });
    it('validates the email format', done => {
      const userData = { ...testUser, email: 'example.com' };
      request(app.getServer())
        .post(uri)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message.startsWith('email')).toBeTruthy();
          done();
        });
    });
    it('validates if role is enum', done => {
      const userData = { ...testUser, role: 'Unknown' };
      request(app.getServer())
        .post(uri)
        .set('Authorization', `Bearer ${token}`)
        .send(userData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.message.startsWith('role')).toBeTruthy();
          done();
        });
    });
    it('creates a user', () => {
      return UserService.findUserByEmail(testUser.email)
        .then(user => (user ? UserService.deleteUser(user.id) : null))
        .then(() => {
          return request(app.getServer())
            .post(`${uri}`)
            .set('Authorization', `Bearer ${token}`)
            .send(testUser)
            .expect(201);
        });
    });
  });

  describe('[GET] /users', () => {
    it('response fineAll Users', async () => {
      return request(app.getServer()).get(uri).set('Authorization', `Bearer ${token}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne User', () => {
      return UserService.findUserByEmail(admin.email).then(user =>
        request(app.getServer())
          .get(`${uri}/${user.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200),
      );
    });
  });

  describe('[PATCH] /users/:id', () => {
    it('updates User', () => {
      const userData = { ...testUser, role: Role.Admin };
      return UserService.findUserByEmail(testUser.email).then(user => {
        request(app.getServer())
          .patch(`${uri}/${user.id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(userData)
          .expect(200);
      });
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('deletes User', () => {
      return UserService.findUserByEmail(testUser.email).then(user => {
        return request(app.getServer())
          .delete(`${uri}/${user.id}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);
      });
    });
  });
});
