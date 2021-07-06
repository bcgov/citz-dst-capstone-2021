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

export interface Project {
  id?: string;
  _schema?: number;
  name: string;
  cpsIdentifier: string;
  projectNumber: string;
  description: string;
  ministry: string;
  program: string;
  sponsor: string;
  manager: string;
  financialContact: string;
  start: Date;
  end?: Date;
  estimatedEnd?: Date;
  progress: number;
  phase?: string;
}
