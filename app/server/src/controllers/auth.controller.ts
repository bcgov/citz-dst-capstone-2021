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
 * Authentication controller
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import { NextFunction, Request, Response } from 'express';
import UserDTO from '@dtos/UserDTO';
import AuthService from '@services/auth.service';
import { RequestWithUser } from '@interfaces/users.interface';

export default {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const userData: UserDTO = req.body;
    return AuthService.signup(userData)
      .then(data => {
        return res.status(201).json(data);
      })
      .catch(e => next(e));
  },

  async login(req: Request, res: Response, next: NextFunction) {
    const userData: UserDTO = req.body;
    // const { expiresIn, token, user } = await this.authService.login(userData);
    return AuthService.login(userData)
      .then(({ expiresIn, token, user }) => {
        res.status(200).json({ expiresIn, token, user });
      })
      .catch(e => next(e));
  },

  async logout(req: RequestWithUser, res: Response, next: NextFunction) {
    const user = req.body;
    return AuthService.logout(user)
      .then(() => {
        res.cookie('token', '');
        res.status(200).json({});
      })
      .catch(e => next(e));
  },
};
