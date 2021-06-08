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

import { CreateUserDto, LoginDto } from '@dtos/users.dto';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { checkIfEmpty } from '@utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    checkIfEmpty(userData, 'user', 400);

    return this.users
      .findOne({ email: userData.email })
      .then(() => {
        throw errorWithCode('the email already exists', 409);
      })
      .catch(e => {
        return this.users.create(userData);
      });
  }

  public async login(userData: LoginDto): Promise<{ expiresIn: number; token: string; user: User }> {
    checkIfEmpty(userData, 'user', 400);
    return this.users
      .findOne({ email: userData.email })
      .then(user => {
        return user.verifyPassword(userData.password).then(() => {
          const tokenData = this.createToken(user, 60 * 60);
          return { user, ...tokenData };
        });
      })
      .catch(e => {
        throw errorWithCode(`user not found: ${e.message}`, 409);
      });
  }

  public async logout(user: User): Promise<void> {
    checkIfEmpty(user, 'user', 400);
    return this.users
      .findOne({ email: user.email })
      .then(user => {
        // what should be done when the user logs out
        return;
      })
      .catch(e => {
        throw errorWithCode(`user not found: ${e.message}`, 409);
      });
  }

  public createToken(user: User, expiresIn: number): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secret: string = config.get('secretKey');
    const token = jwt.sign(dataStoredInToken, secret, { expiresIn });
    return { expiresIn, token };
  }
}

export default AuthService;
