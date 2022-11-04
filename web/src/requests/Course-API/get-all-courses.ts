import { baseGetRequest } from '../base-requests';

export const getAllCourses = (
  email: string,
  access_token: string,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  baseGetRequest(
    "/courses/get_all_courses/" + email + "/" + access_token,
    responseHandler,
    errorHandler
  );
};
