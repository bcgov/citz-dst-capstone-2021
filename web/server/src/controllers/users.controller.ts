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
import { User } from '@interfaces/users.interface';
import UserService from '@services/users.service';

export default {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data: User[] = await UserService.findAllUsers();

      res.status(200).json({ data, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  },

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const data: User = await UserService.findUserById(userId);

      res.status(200).json({ data, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  },

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;
      const data: User = await UserService.createUser(userData);

      res.status(201).json({ data, message: 'created' });
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const data: User = await UserService.updateUser(userId, userData);

      res.status(200).json({ data, message: 'updated' });
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const data: User = await UserService.deleteUser(userId);

      res.status(200).json({ data, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  },
};
