import { ICourseData } from '../../utils/interfaces/interfaces';
import { basePutRequest } from '../base-requests';

export const updateCourse = (
    course: ICourseData,
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