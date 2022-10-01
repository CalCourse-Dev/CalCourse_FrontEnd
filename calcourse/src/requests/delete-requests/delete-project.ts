import { baseDeleteRequest } from '../base-requests';

export const deleteProject = (project_id: string, user_id: string) => {
  baseDeleteRequest(`project?project_id=${project_id}&user_id=${user_id}`);
};
