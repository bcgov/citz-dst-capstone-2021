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

import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { AuthRequest, AuthResponse, Project, User } from '../types';
import { API } from '../constants';

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
    async login(authReq: AuthRequest): Promise<User> {
      if (!api.current) throw new Error('axios not set up');
      return api.current
        .post<AuthResponse>(`login`, authReq)
        .then(({ data }) => {
          setApiToken(data.token);
          return data.user;
        });
    },

    async logout(user: User): Promise<User> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.post('logout').then(() => {
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

    // TODO: (nick) pass user to limit result for the user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getProjects(user?: User): Promise<Project[]> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`projects`).then(({ data }) => data.data);
    },

    getProjectDetail(cps: any): Promise<Project> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`projects/${cps}`).then(({ data }) => {
        return data.data;
      });
    },
  };
};

export default useApi;
