import { CourseData } from '../../utils/interfaces';
import { basePutRequest } from '../base-requests';

export const updateCourse = (
    course: CourseData,
    responseHandler: (data: any) => void,
    errorHandler: (error: any) => void
  ) => {
    basePutRequest(
      "/courses/update_course",
      course,
      responseHandler,
      errorHandler,
    );
  };