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

// eslint-disable-next-line max-classes-per-file
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Report, Quarter, ReportState } from '@interfaces/report.interface';
import { Type } from 'class-transformer';

import MilestoneDTO from '@dtos/milestone.dto';
import ReportStatusDTO from '@dtos/reportStatus.dto';
import ObjectiveDTO from '@dtos/objective.dto';

export class ReportQueryDTO {
  @IsMongoId()
  projectId: string;

  @IsOptional()
  @IsNumberString()
  year: number;

  @IsOptional()
  @IsEnum(Quarter)
  quarter: Quarter;
}

class ReportDTO implements Report {
  @IsMongoId()
  submitter: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  submittedAt: Date;

  @IsNumber()
  @Min(1970)
  @Max(3000)
  year: number;

  @IsEnum(Quarter)
  quarter: Quarter;

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

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  estimatedEnd: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MilestoneDTO)
  milestones: [MilestoneDTO];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObjectiveDTO)
  objectives: ObjectiveDTO[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReportStatusDTO)
  statuses: ReportStatusDTO[];
}

export default ReportDTO;
