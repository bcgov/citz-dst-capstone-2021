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

import { Milestone, MilestoneStatus } from '@interfaces/report.interface';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

class MilestoneDTO implements Milestone {
  @IsOptional()
  @IsString()
  comments: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  estimatedEnd: Date;

  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @IsDate()
  @Type(() => Date)
  start: Date;

  @IsOptional()
  @IsEnum(MilestoneStatus)
  status: MilestoneStatus;
}

export default MilestoneDTO;
