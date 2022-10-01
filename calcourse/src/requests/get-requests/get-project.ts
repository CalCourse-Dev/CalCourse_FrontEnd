import { baseGetRequest } from '../base-requests';

export const getProject = (
  project_id: string,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void
) => {
  baseGetRequest(`project?project_id=${project_id}`, [], resHandler, errHandler);
};
