import { CourseData } from '../../utils/interfaces';
import { basePostRequest } from '../base-requests';

export const uploadCourse = (
  data: any,
  course: CourseData,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/courses/upload_course",
    data,
    course,
    responseHandler,
    errorHandler
  );
};
