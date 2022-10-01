import { basePostRequest } from '../base-requests';

export const postAnalysis = (
  data: any,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void
) => {
  basePostRequest(`analysis`, data, resHandler, errHandler);
};
