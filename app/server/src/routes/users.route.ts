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
import UsersController from '@controllers/users.controller';
import UserDTO from '@dtos/UserDTO';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Route {
  public resource = 'users';

  secure = true;

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route('/')
      .get(UsersController.getUsers)
      .post(validationMiddleware(UserDTO, 'body'), UsersController.createUser);

    this.router
      .route('/:id')
      .get(UsersController.getUserById)
      .patch(validationMiddleware(UserDTO, 'body', true), UsersController.updateUser)
      .delete(UsersController.deleteUser);
  }
}

export default UsersRoute;
