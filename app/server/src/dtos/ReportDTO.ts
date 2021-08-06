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
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Quarter, Report, ReportState } from '@interfaces/report.interface';
import { Type } from 'class-transformer';

import MilestoneDTO from '@dtos/MilestoneDTO';
import ReportStatusDTO from '@dtos/ReportStatusDTO';
import ObjectiveDTO from '@dtos/ObjectiveDTO';
import KpiDTO from '@dtos/KpiDTO';
import FinancialStatusDTO from '@dtos/FinancialStatusDTO';

/**
 * Validate a report object for {@link Report}
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @class
 */
class ReportDTO implements Report {
  @IsOptional()
  @IsMongoId()
  id: string;

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
  @Type(() => Number)
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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KpiDTO)
  kpis: KpiDTO[];

  @IsOptional()
  @Type(() => FinancialStatusDTO)
  finance: FinancialStatusDTO;

  @IsOptional()
  @IsMongoId()
  financialAnalyst: string;

  @IsOptional()
  @IsString()
  financialNotes: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  approvedAt: Date;
}

export default ReportDTO;
