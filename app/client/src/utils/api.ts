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

/**
 * API Hooks - create axios instance and define requests to APIs
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */

import axios from 'axios';
import type { AxiosInstance } from 'axios';
import assert from 'assert';

import {
  AuthRequest,
  AuthResponse,
  Kpi,
  Milestone,
  Objective,
  Project,
  Report,
  User,
} from '../types';
import { API } from '../constants';
import utils from '.';

const api: { current: AxiosInstance } = {
  current: axios.create({
    baseURL: API.BASE_URL(),
  }),
};

export const setApiToken = (token: string): void => {
  if (token) {
    api.current = axios.create({
      baseURL: API.BASE_URL(),
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    api.current = axios.create({ baseURL: API.BASE_URL() });
  }
};

const useApi = () => {
  return {
    hookError(responseCallback: (response: any) => any, errorCallback: (error: any) => void) {
      api.current.interceptors.response.use(responseCallback, errorCallback);
    },
    async login(authReq: AuthRequest): Promise<User> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.post<AuthResponse>(`login`, authReq).then(({ data }) => {
        setApiToken(data.token);
        return data.user;
      });
    },

    async logout(user: User): Promise<User> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.post('logout', user).then(() => {
        setApiToken('');
        return user;
      });
    },

    signup(user: any): Promise<User> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.post('signup', user).then(() => {
        return user;
      });
    },

    // TODO: (Nick) pagination: pass user to limit result for the user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getProjects(user?: User): Promise<Project[]> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`projects`).then(({ data }) => data);
    },

    getProject(projectId: string): Promise<Project> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`projects/${projectId}`).then(({ data }) => data);
    },

    getProjectDetail(cps: string): Promise<Project> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`projects/${cps}`).then(({ data }) => data);
    },

    getUsers(): Promise<User[]> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`users`).then(({ data }) => data);
    },

    getUser(userId: string): Promise<User> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`users/${userId}`).then(({ data }) => data);
    },

    createProject(project: any): Promise<Project> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.post(`projects`, project).then(({ data }) => data);
    },

    getReports(projectId?: string, options?: Record<string, any>): Promise<Report[]> {
      if (!api.current) throw new Error('axios not set up');
      const params = projectId ? { projectId } : {};
      if (options) Object.assign(params, options);
      return api.current.get(`reports`, { params }).then(({ data }) => data);
    },

    getReport(reportId: string): Promise<Report> {
      if (!api.current) throw new Error('axios not set up');
      return api.current
        .get(`reports/${reportId}`, { params: { reportId } })
        .then(({ data }) => data);
    },

    getLastReport(projectId: string): Promise<Report[]> {
      if (!api.current) throw new Error('axios not set up');
      return api.current
        .get('reports', { params: { projectId, last: true } })
        .then(({ data }) => data);
    },

    updateReport(report: any): Promise<Report> {
      if (!api.current) throw new Error('axios not set up');
      utils.removeProperties(report, 'createdAt', 'updatedAt', 'project');
      return api.current.patch(`reports/${report.id}`, report).then(({ data }) => data);
    },

    updateProject(id: string, update: any): Promise<Project> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.patch(`projects/${id}`, update).then(({ data }) => data);
    },

    updateMilestone(reportId: string, milestoneId: string | undefined, update: any) {
      assert(api.current);
      utils.removeProperties(update, 'createdAt', 'updatedAt');
      return api.current
        .patch(`reports/${reportId}/milestones/${milestoneId}`, update)
        .then(({ data }) => data);
    },

    updateObjective(reportId: string, objectiveId: string | undefined, update: any) {
      assert(api.current);
      utils.removeProperties(update, 'createdAt', 'updatedAt');
      return api.current
        .patch(`reports/${reportId}/objectives/${objectiveId}`, update)
        .then(({ data }) => data);
    },

    updateKpi(reportId: string, kpiId: string | undefined, update: any) {
      assert(api.current);
      utils.removeProperties(update, 'createdAt', 'updatedAt');
      return api.current
        .patch(`reports/${reportId}/kpis/${kpiId}`, update)
        .then(({ data }) => data);
    },

    deleteProject(id: string) {
      assert(api.current);
      return api.current.delete(`projects/${id}`).then(({ data }) => data);
    },

    createKpi(reportId: string, kpi: Kpi): Promise<Report> {
      assert(api.current);
      return api.current.post(`reports/${reportId}/kpis`, kpi).then(({ data }) => data);
    },

    createObjective(reportId: string, objective: Objective): Promise<Report> {
      assert(api.current);
      return api.current.post(`reports/${reportId}/objectives`, objective).then(({ data }) => data);
    },

    createMilestone(reportId: string, milestone: Milestone): Promise<Report> {
      assert(api.current);
      return api.current.post(`reports/${reportId}/milestones`, milestone).then(({ data }) => data);
    },

    submitReport(report: any): Promise<Report> {
      assert(api.current);
      return api.current.patch(`reports/${report.id}/submit`, report).then(({ data }) => data);
    },
  };
};

export default useApi;
