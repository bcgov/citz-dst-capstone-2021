//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

export enum Role {
  Admin = 'Admin',
  Submitter = 'Submitter',
  FA = 'FA', // financial analyst
  Executive = 'Executive',
  User = 'User',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  role?: Role;
  active?: boolean;
  ministry: string;
}

// types for redux actions

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// redux action types
export enum ActionTypes {
  login,
  logout,
  fetchProjects,
}

export interface LoginAction {
  type: ActionTypes.login | ActionTypes.logout;
  payload: User;
}

export interface Action {
  type: ActionTypes;
}

export interface ProjectAction {
  type: ActionTypes.fetchProjects;
  payload: Project[];
}

// redux state structure
export interface StoreState {
  user: User;
}

// TODO: (nick) users should be mapped to the exact User type
// export interface SimpleContact {
//   firstName: string;
//   lastName: string;
//   id: string;
// }

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

export enum MilestoneStatus {
  Green,
  Yellow,
  Red,
  Completed,
  NotStarted,
}

export interface NewProject {
  name: string;
  cpsIdentifier: string;
  projectNumber: string;
  description: string;
  ministry: string;
  program: string;
  sponsor: string;
  manager: string;
  financialContact: string;
  start: string;
  estimatedEnd: string;
  end: string;
}

export interface Project {
  id: string;
  name: string;
  cpsIdentifier: string;
  projectNumber: string;
  description: string;
  ministry: string;
  program: string;
  progress: number;
  phase: string;
  sponsor: User;
  manager: User;
  financialContact: User;
  start: string;
  estimatedEnd: string;
  end: string;
}

export interface NewMilestone {
  name: string;
  start: Date;
  estimatedEnd: Date;
  comments: string;
}

export interface Milestone extends NewMilestone {
  id?: string;
  status: MilestoneStatus;
  progress: number;
}

export interface Objective {
  id?: string;
  name: string;
  description: string;
  estimatedEnd: string;
  status: Status;
  phase: string;
  asset: string;
  comments: string;
}

export enum Quarter {
  Q1 = 'Q1',
  Q2 = 'Q2',
  Q3a = 'Q3a',
  Q3b = 'Q3b',
  Q4 = 'Q4',
}

export enum ReportState {
  Draft,
  Review,
  Submitted,
}

export interface ReportStatus {
  id?: string;
  type: StatusType;
  status: Status;
  trend: Trend;
  comments: string;
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
