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

import { IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from '@interfaces/roles.interface';
import LoginDTO from '@dtos/LoginDTO';

class UserDTO extends LoginDTO {
  @IsOptional()
  @IsMongoId()
  id?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  lastName: string;

  @IsString()
  title: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsString()
  ministry: string;
}

export default UserDTO;
