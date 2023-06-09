import { ICourseData } from '../../utils/interfaces';
import { basePostRequest } from '../base-requests';

export const uploadCourse = (
  course: ICourseData,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/courses/upload_course",
    course,
    responseHandler,
    errorHandler
  );
};
