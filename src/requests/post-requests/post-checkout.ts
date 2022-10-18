import { basePostRequest } from '../base-requests';

export const postCheckout = (
  data: any,
  responseHandler: (data: any) => void,
  errHandler: (error: any) => void
) => {
  basePostRequest(`payment`, data, responseHandler, errHandler);
};
