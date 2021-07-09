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

import bcrypt from 'bcrypt';
import { errorWithCode } from '@bcgov/common-nodejs-utils';

import { UserDTO } from '@dtos/UserDTO';
import { User } from '@interfaces/users.interface';
import UserModel from '@models/users.model';
import { checkIfEmpty } from '@utils/util';

export default {
  async findAllUsers(): Promise<User[]> {
    const users: User[] = await UserModel.find();
    return users;
  },

  findUserById(_id: string): Promise<User> {
    checkIfEmpty(_id, 'user', 400);
    return UserModel.findOne({ _id }).then(user => user);
  },

  findUserByEmail(email: string): Promise<User> {
    checkIfEmpty(email, 'email', 400);
    return UserModel.findOne({ email }).then(user => user);
  },

  async createUser(userData: UserDTO): Promise<User> {
    checkIfEmpty(userData, 'email', 400);

    const user: User = await UserModel.findOne({ email: userData.email });
    if (user) {
      throw errorWithCode(`The email ${userData.email} already exists`, 409);
    }

    const password = await bcrypt.hash(userData.password, 12);
    // @ts-ignore
    const createUserData: User = await UserModel.create({ ...userData, password });

    return createUserData;
  },

  async updateUser(userId: string, userData: UserDTO): Promise<User> {
    checkIfEmpty(userId, 'id', 400);
    const input = { ...userData };
    if (input.password) {
      input.password = await bcrypt.hash(input.password, 12);
    }
    const user = await UserModel.findByIdAndUpdate(userId, input, { new: true });
    if (!user) {
      throw errorWithCode(`Unable to update user`, 500);
    }
    return user;
  },

  deleteUser(userId: string): Promise<User> {
    return UserModel.findByIdAndDelete(userId).catch(e => {
      throw errorWithCode(`Unable to delete user: ${e.message}`, 500);
    });
  },
};
