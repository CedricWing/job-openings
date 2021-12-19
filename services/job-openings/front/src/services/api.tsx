import { useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import memoizee from 'memoizee';
import { JobOpenings, Position } from '@common/utils/types';
import * as yup from 'yup';
import { useCb } from '../lib/hooks';
import { ApiContext } from '../components/ApiProvider/context';

class JobOpeningsApi {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    });
  }

  get = async (url: string) => {
    try {
      const response = await this.api.get(url);
      return response?.data;
    } catch (error) {
      console.log(`Error: Unable to send request to Job Openings API`, error);
      return undefined;
    }
  };
}

const schema = yup
  .object({
    teams: yup
      .array(
        yup
          .object({
            name: yup.string().required(),
            active: yup.boolean().required(),
            jobs: yup
              .array<Position>(
                yup.object({
                  name: yup.string().required(),
                  count: yup.number().required(),
                  active: yup.boolean().required(),
                }),
              )
              .required(),
          })
          .required(),
      )
      .required(),
  })
  .required();
const validateJobOpeningsData = async (
  data: { teams: JobOpenings } | undefined,
) => {
  const res = await schema.isValid(data);
  if (!res || data == null)
    throw Error('Schema for default job openings invalid');
  return data.teams;
};

export const useApiInstance = () => {
  const handle = new JobOpeningsApi();
  const getDefaultJobOpenigns = useCb(
    memoizee(async () => {
      const rawData = await handle.get('/default');
      try {
        return validateJobOpeningsData(rawData);
      } catch (error) {
        console.log(error);
        return [];
      }
    }),
  );
  return { getDefaultJobOpenigns };
};

const useApi = () => useContext(ApiContext);
export default useApi;
