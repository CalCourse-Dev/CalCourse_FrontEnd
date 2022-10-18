import { baseGetRequest } from '../base-requests';

export const getUser = (
  user_id: string,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void
) => {
  baseGetRequest(`user?user_id=${user_id}`, [], resHandler, errHandler);
};
