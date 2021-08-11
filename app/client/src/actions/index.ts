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
 * Redux Actions
 * @author [SungHwan Park](shwpark612@gmail.com)
 * @module
 */
import { Dispatch } from 'redux';

import useApi from '../utils/api';
import { LoginAction, ProjectAction, AuthRequest, ActionTypes, User } from '../types';

export const login = (loginReq: AuthRequest) => {
  return async (dispatch: Dispatch) => {
    const response = await useApi().login(loginReq);
    dispatch<LoginAction>({
      type: ActionTypes.login,
      payload: response,
    });
    return response;
  };
};

export const logout = (user: User) => {
  return (dispatch: Dispatch) => {
    return useApi()
      .logout(user)
      .catch(() => {})
      .finally(() => {
        dispatch<LoginAction>({
          type: ActionTypes.logout,
          payload: {} as User,
        });
      });
  };
};

/**
 * TODO: (Nick) query projects that the user has permission
 * @param user User
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchProjects = (user?: User) => {
  return async (dispatch: Dispatch) => {
    const response = await useApi().getProjects();
    dispatch<ProjectAction>({
      type: ActionTypes.fetchProjects,
      payload: response,
    });
    return response;
  };
};
