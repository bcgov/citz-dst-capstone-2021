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

import { IsDate, IsDateString, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Report, ReportQuarter, ReportState } from '@interfaces/report.interface';

class CreateReportDTO implements Report {
  @IsMongoId()
  reporter: string;

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

  @IsEnum(ReportState)
  state: ReportState;

  @IsString()
  phase: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @IsDateString()
  estimatedEnd: string;
}

export default CreateReportDTO;
