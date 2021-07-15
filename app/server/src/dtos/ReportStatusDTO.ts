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

import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ReportStatus, StatusType, Status, Trend } from '@interfaces/report.interface';
import { Type } from 'class-transformer';

class ReportStatusDTO implements ReportStatus {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  comments: string;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(Trend)
  trend: number;

  @IsOptional()
  @Type(() => Number)
  @IsEnum(StatusType)
  type: StatusType;
}

export default ReportStatusDTO;
