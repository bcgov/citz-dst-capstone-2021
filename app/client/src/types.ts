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
export interface SimpleContact {
  firstName: string;
  lastName: string;
  id: string;
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
  sponsor: SimpleContact;
  manager: SimpleContact;
  financialContact: SimpleContact;
  start: string;
  estimatedEnd: string;
  end: string;
}

export interface Project extends NewProject {
  id: string;
  progress: number;
  phase: string;
}

export interface NewMilestone {
  name: string;
  start: string;
  estimatedEnd: string;
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
