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

import { User } from '@interfaces/users.interface';

export enum Quarter {
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3a = 'Q3a',
  Q3b = 'Q3b',
  Q4 = 'Q4',
}

export enum ReportState {
  Draft,
  ReadyToSubmit,
  Submitted,
  FollowUpRequired,
  Approved,
}

export interface Report {
  id?: string;
  submitter?: string;
  submittedAt?: Date;
  year: number;
  quarter: Quarter;
  projectId: string;
  state: ReportState;
  phase: string;
  progress: number;
  estimatedEnd?: Date;
  milestones: Milestone[];
  objectives: Objective[];
  statuses: ReportStatus[];
  finance?: FinancialStatus;
  kpis: Kpi[];
  financialAnalyst?: string | User;
  financialNotes?: string;
  approvedAt?: Date;
}

export enum Status {
  Green,
  Yellow,
  Red,
}

export enum Trend {
  Up,
  Steady,
  Down,
}

export enum StatusType {
  Overall,
  Scope,
  Budget,
  Schedule,
  Other,
}

export interface ReportStatus {
  id?: string;
  type: StatusType;
  status: Status;
  trend: Trend;
  comments: string;
}

export enum MilestoneStatus {
  Green,
  Yellow,
  Red,
  Completed,
  NotStarted,
}

export interface Milestone {
  id?: string;
  name: string;
  status: MilestoneStatus;
  start: Date;
  estimatedEnd?: Date;
  progress: number;
  comments: string;
}

export interface Objective {
  id?: string;
  name: string;
  description: string;
  estimatedEnd: Date;
  status: Status;
  phase: string;
  asset: string;
  comments: string;
}

export interface Kpi {
  id?: string;
  name: string;
  description: string;
  unit: string;
  baseline: number;
  target: number;
  value: number;
  end: Date;
  outcome: boolean;
  output: boolean;
}

export interface FinancialStatus {
  fyApproved: number; // current fiscal year approved funding
  fySitting: number; // sitting in ministry
  jvToOcio: number; // journal voucher to OCIO
  fyForecast: number; // current fiscal year full year forecasted spend
  budget: number; // total project budget
  spendToEndOfPreFy: number; // project spend to end of previous fiscal year
  remaining: number; // projected funding for remaining fiscal years
  estimatedTotalCost: number; // estimated total cost
}
