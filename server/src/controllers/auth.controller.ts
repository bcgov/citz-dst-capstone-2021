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

import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';

export default {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const userData: CreateUserDto = req.body;
    return AuthService.signup(userData)
      .then(data => {
        return res.status(201).json({ data, message: 'signup' });
      })
      .catch(e => next(e));
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const userData: CreateUserDto = req.body;
    // const { expiresIn, token, user } = await this.authService.login(userData);
    return AuthService.login(userData)
      .then(({ expiresIn, token, user }) => {
        const httpOnly = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
          maxAge: httpOnly ? expiresIn : Number.MAX_VALUE,
          httpOnly,
        });
        res.status(200).json({ token, user });
      })
      .catch(e => next(e));
  },

  async logout(req: RequestWithUser, res: Response, next: NextFunction) {
    const { user } = req;
    return AuthService.logout(user)
      .then(() => {
        res.cookie('token', '');
        res.status(200).json({ data: '', message: 'logout' });
      })
      .catch(e => next(e));
  },
};
