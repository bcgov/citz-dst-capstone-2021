import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from "axios";

import { API } from '../constants';
import assert from 'assert';

const api: { current: AxiosInstance } = {
  current: axios.create({
    baseURL: API.BASE_URL()
  }),
};

export const setApiToken = (token: string) => {
  assert(token, 'token must be set');
  api.current = axios.create({
    baseURL: API.BASE_URL(),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

const useApi = () => {
  return {
    async login(requestBody: any): Promise<AxiosResponse<any>> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.post(
        `login`,
        requestBody
      ).then(({data}) => {
        setApiToken(data.token);
        return data;
      });
    },

    getProjects(): Promise<AxiosResponse<any>> {
      if (!api.current) throw new Error('axios not set up');
      return api.current.get(`projects`).then(({ data }) => data);
    }
  }
}

export default useApi;
