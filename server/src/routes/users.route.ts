/* eslint-disable prettier/prettier */
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

import { Router } from 'express';
import passport from 'passport';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Route {
  public resource = 'users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route('/')
      .get(passport.authenticate('cookie', { session: false }), this.usersController.getUsers)
      .post(
        passport.authenticate('cookie', { session: false }),
        validationMiddleware(CreateUserDto, 'body'),
        this.usersController.createUser,
      );

    this.router
      .route('/:id')
      .get(passport.authenticate('cookie', { session: false }), this.usersController.getUserById)
      .patch(
        passport.authenticate('cookie', { session: false }),
        validationMiddleware(CreateUserDto, 'body', true),
        this.usersController.updateUser,
      )
      .delete(this.usersController.deleteUser);
  }
}

export default UsersRoute;
