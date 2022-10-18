import { basePostRequest } from '../base-requests';

export const postProject = (
  user_id: string,
  data: any,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void
) => {
  basePostRequest(`project?user_id=${user_id}`, data, resHandler, errHandler);
};
