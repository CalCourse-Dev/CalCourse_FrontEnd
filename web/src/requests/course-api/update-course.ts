import { CourseData } from '../../utils/interfaces';
import { basePutRequest } from '../base-requests';

export const updateCourse = (
    data: any,
    course: CourseData,
    responseHandler: (data: any) => void,
    errorHandler: (error: any) => void
  ) => {
    basePutRequest(
      "/courses/update_course",
      data,
      course,
      responseHandler,
      errorHandler,
    );
  };