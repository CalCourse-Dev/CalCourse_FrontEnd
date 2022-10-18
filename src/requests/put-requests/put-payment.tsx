import { basePutRequest } from '../base-requests';

export const putPayment = (
  // params: Record<string, string>,
  user_id: string,
  // eslint-disable-next-line
  data: any,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void
) => {
  basePutRequest(`payment?user_id=${user_id}`, data, resHandler, errHandler);
};
