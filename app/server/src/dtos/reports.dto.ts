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
  IsEnum,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Report, ReportQuarter, ReportState } from '@interfaces/report.interface';
import { Type } from 'class-transformer';

export class ReportQueryDTO {
  @IsMongoId()
  projectId: string;

  @IsOptional()
  @IsNumberString()
  year: number;

  @IsOptional()
  @IsEnum(ReportQuarter)
  quarter: ReportQuarter;
}

class CreateReportDTO implements Report {
  @IsMongoId()
  submitter: string;

  @IsOptional()
  @IsDateString()
  submittedAt: string;

  @IsNumber()
  @Min(1970)
  @Max(3000)
  year: number;

  @IsEnum(ReportQuarter)
  quarter: ReportQuarter;

  @IsMongoId()
  projectId: string;

  @IsOptional()
  @IsEnum(ReportState)
  state: ReportState;

  @IsOptional()
  @IsString()
  phase: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @IsDateString()
  estimatedEnd: string;
}

export default CreateReportDTO;
