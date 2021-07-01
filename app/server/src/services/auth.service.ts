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

import config from 'config';
import jwt from 'jsonwebtoken';
import { errorWithCode } from '@bcgov/common-nodejs-utils';

import { UserDTO, LoginDTO } from '@dtos/users.dto';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import UserModel from '@models/users.model';
import { checkIfEmpty } from '@utils/util';
import bcrypt from 'bcrypt';

export default {
  async signup(userData: UserDTO): Promise<User> {
    checkIfEmpty(userData, 'user', 400);

    const user = await UserModel.findOne({ email: userData.email });
    if (user) {
      throw errorWithCode('the email already exists', 409);
    }
    const password = await bcrypt.hash(userData.password, 12);
    return UserModel.create({ ...userData, password });
  },

  async login(userData: LoginDTO): Promise<{ expiresIn: number; token: string; user: User }> {
    checkIfEmpty(userData, 'user', 400);
    return UserModel.findOne({ email: userData.email }).then(user => {
      if (!user) throw errorWithCode(`user not found`, 409);
      return user.verifyPassword(userData.password).then(result => {
        if (result) {
          const tokenData = this.createToken(user, 10 * 60 * 1000);
          return { user, ...tokenData };
        }
        throw errorWithCode(`user not found`, 409);
      });
    });
  },

  async logout(user: User): Promise<void> {
    checkIfEmpty(user, 'user', 400);
    return UserModel.findOne({ email: user.email })
      .then(() => {
        // what should be done when the user logs out
      })
      .catch(e => {
        throw errorWithCode(`user not found: ${e.message}`, 409);
      });
  },

  createToken(user: User, expiresIn: number): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = config.get('secretKey');
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn });
    return { expiresIn, token };
  },
};
