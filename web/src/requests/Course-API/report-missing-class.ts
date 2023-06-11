import { MissingRecord } from '../../utils/interfaces/interfaces';
import { basePostRequest } from '../base-requests';

export const reportMissingClass = (
  missingClass: MissingRecord,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/courses/report_missing_class",
    missingClass,
    responseHandler,
    errorHandler
  );
};