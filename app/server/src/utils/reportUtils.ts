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

import { Project } from '@interfaces/project.interface';
import { Quarter, Report, ReportState, ReportStatus, Status, StatusType, Trend } from '@interfaces/report.interface';

// eslint-disable-next-line import/prefer-default-export
export const getInitialReport = (project: Project): Report => {
  const { id: projectId, estimatedEnd, start, manager: submitter } = project;

  const year = start.getFullYear();

  let quarter = Quarter.Q1;
  const month = start.getMonth();
  if (month > 2 && month < 6) {
    quarter = Quarter.Q2;
  } else if (month < 9) {
    quarter = Quarter.Q3a;
  } else {
    quarter = Quarter.Q4;
  }

  const statuses: ReportStatus[] = Object.values(StatusType)
    .filter(type => typeof type === 'number')
    .map((type: StatusType) => {
      return { status: Status.Green, trend: Trend.Steady, comments: '', type };
    });

  const report: Report = {
    projectId,
    estimatedEnd,
    milestones: [],
    objectives: [],
    phase: '',
    progress: 0,
    quarter,
    submitter,
    state: ReportState.Draft,
    statuses,
    year,
  };
  return report;
};
