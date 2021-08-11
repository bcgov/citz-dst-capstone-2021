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
 * User and authentication related type definitions
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import { Request } from 'express';

export enum Role {
  Admin = 'Admin',
  Submitter = 'Submitter',
  FA = 'FA', // financial analyst
  Executive = 'Executive',
  User = 'User',
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  role?: Role;
  active?: boolean;
  ministry: string;

  verifyPassword: Function;
}

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
