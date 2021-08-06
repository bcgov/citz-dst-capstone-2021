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

import 'reflect-metadata';
import { connect, disconnect } from 'mongoose';
import faker from 'faker';
import ProjectService from '@services/projects.service';
import UserService from '@services/users.service';
import DBConfig from '@/databases';
import { Role } from '@interfaces/roles.interface';
import UserDTO from '@dtos/UserDTO';
import { plainToClass } from 'class-transformer';
import ProjectCreateDTO from '@dtos/ProjectCreateDTO';
import testData from './testData.json';

beforeAll(async () => {
  await connect(DBConfig.url, DBConfig.options);
});

afterAll(async () => {
  await disconnect();
});

describe('loading test data', () => {
  it('generate user data', done => {
    Promise.all(
      Object.values(Role).map(role => {
        const user: UserDTO = {
          active: false,
          email: faker.internet.email(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          ministry: "Citizens' Services",
          password: 'P@ssw0rd1',
          role,
          title: faker.name.jobTitle(),
        };
        return UserService.createUser(user).then(data => {
          expect(data).toBeDefined();
        });
      }),
    ).then(() => {
      done();
    });
  });
  it('loading sample projects', () => {
    return Promise.all(
      testData.projects.map((prjData: any) => {
        const prj = plainToClass(ProjectCreateDTO, prjData) as ProjectCreateDTO;
        return ProjectService.getProjectDetail(prj.cpsIdentifier).then(data => {
          return data || ProjectService.createProject(prj);
        });
      }),
    ).then(projects => {
      expect(projects.length).toBeGreaterThan(0);
    });
  });
});
