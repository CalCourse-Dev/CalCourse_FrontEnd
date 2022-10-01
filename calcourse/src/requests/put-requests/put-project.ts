import { basePutRequest } from '../base-requests';

export const putProject = (
  // params: Record<string, string>,
  project_id: string,
  // eslint-disable-next-line
  update_type: string,
  // eslint-disable-next-line
  data: any,
  // eslint-disable-next-line
  resHandler: (data: any) => void,
  // eslint-disable-next-line
  errHandler: (error: any) => void,
  // eslint-disable-next-line
  abtest_id?: string,
  // eslint-disable-next-line
  analysis_id?: string,
  // eslint-disable-next-line
  user_id?: string
) => {
  // each putProject request must has a project_id and a update_type
  // there are four cases for update_type
  let url = `project?project_id=${project_id}&update_type=${update_type}`;
  switch (update_type) {
    case 'analysis_id':
      url += `&analysis_id=${analysis_id}`;
      break;
    case 'abtest_id':
      url += `&abtest_id=${abtest_id}`;
      break;
    case 'user_id':
      url += `&user_id=${user_id}`;
      break;
    case 'analysis_file':
      // for consistency. this case will do nothing since the image file is in data field
      break;
    default:
      break;
  }
  basePutRequest(url, data, resHandler, errHandler);
};
