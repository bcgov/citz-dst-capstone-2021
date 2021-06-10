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

import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { checkIfEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public findUserById(_id: string): Promise<User> {
    checkIfEmpty(_id, 'user', 400);
    return this.users.findOne({ _id }).then(user => user);
  }

  public findUserByEmail(email: string): Promise<User> {
    checkIfEmpty(email, 'email', 400);
    return this.users.findOne({ email }).then(user => user);
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    checkIfEmpty(userData, 'email', 400);

    const user: User = await this.users.findOne({ email: userData.email });
    if (user) {
      throw errorWithCode(`The email ${userData.email} already exists`, 409);
    }

    // TODO: (shp) We could use mongoose middleware
    const password = await bcrypt.hash(userData.password, 12);
    const createUserData: User = await this.users.create({ ...userData, password });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    checkIfEmpty(userId, 'id', 400);
    const input = { ...userData };
    if (input.password) {
      input.password = await bcrypt.hash(input.password, 12);
    }
    const user = await this.users.findByIdAndUpdate(userId, input, { new: true });
    if (!user) {
      throw errorWithCode(`Unable to update user`, 500);
    }
    return user;
  }

  public async deleteUser(userId: string): Promise<User> {
    return this.users.findByIdAndDelete(userId).catch(e => {
      throw errorWithCode(`Unable to delete user: ${e.message}`, 500);
    });
  }
}

export default UserService;
