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

import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsNumber()
  _schema?: number;

  @IsString()
  @Length(11)
  cpsIdentifier: string;

  @IsOptional()
  @IsString()
  projectNumber: string;

  @IsString()
  description: string;

  @IsString()
  @MinLength(6)
  ministry: string;

  @IsString()
  @MinLength(5)
  program: string;

  @IsMongoId()
  sponsor: string;

  @IsMongoId()
  manager: string;

  @IsMongoId()
  financialContact: string;

  @IsDateString()
  start: string;

  @IsOptional()
  @IsDateString()
  end: string;

  @IsOptional()
  @IsDateString()
  estimatedEnd: string;

  @Min(0)
  @Max(100)
  progress: number;

  @IsOptional()
  @IsString()
  phase: string;
}

export default CreateProjectDTO;
