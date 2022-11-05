import { baseDeleteRequest } from '../base-requests';

export const deleteCourse = (
  course_term: string,
  course_name: string,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
  ) => {
    baseDeleteRequest(
      "/courses/delete_course/" + course_term + "/" + course_name,
      responseHandler,
      errorHandler
    );
  };