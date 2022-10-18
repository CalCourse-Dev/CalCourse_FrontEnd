import { baseGetRequest } from '../base-requests';

export const getAnalysis = (
  image_id: string,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void
) => {
  baseGetRequest(`analysis?id=${image_id}`, [], resHandler, errHandler);
};
