import { MissingRecord } from '../../utils/interfaces';
import { basePostRequest } from '../base-requests';

export const reportMissingClass = (
  data: any,
  missingClass: MissingRecord,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/courses/report_missing_class",
    data,
    missingClass,
    responseHandler,
    errorHandler
  );
};