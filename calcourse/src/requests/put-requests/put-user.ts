import { basePutRequest } from '../base-requests';

export const putUser = (
  // params: Record<string, string>,
  // eslint-disable-next-line
  data: any,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void
) => {
  basePutRequest(`user`, data, resHandler, errHandler);
};
