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
 * {@link Route} definitions for authentication
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import { Router } from 'express';

import AuthController from '@controllers/auth.controller';
import UserDTO from '@dtos/UserDTO';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import LoginDTO from '@dtos/LoginDTO';

class AuthRoute implements Route {
  public resource = '';

  public secure = false;

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/signup', validationMiddleware(UserDTO, 'body'), AuthController.signUp);
    this.router.post('/login', validationMiddleware(LoginDTO, 'body'), AuthController.login);
    this.router.post('/logout', AuthController.logout);
  }
}

export default AuthRoute;
