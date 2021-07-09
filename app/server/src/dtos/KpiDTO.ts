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

import { Kpi } from '@interfaces/report.interface';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

class KpiDTO implements Kpi {
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  name: string;

  @IsString()
  description: string;

  @IsDate()
  @Type(() => Date)
  end: Date;

  @IsOptional()
  @IsString()
  unit: string;

  @IsOptional()
  @IsNumber()
  baseline: number;

  @IsOptional()
  @IsNumber()
  target: number;

  @IsOptional()
  @IsBoolean()
  outcome: boolean;

  @IsOptional()
  @IsBoolean()
  output: boolean;
}

export default KpiDTO;
