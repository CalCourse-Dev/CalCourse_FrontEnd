import { SingleEvent } from '../../utils/interfaces';
import { basePostRequest } from '../base-requests';

export const createEvent = (
  event: SingleEvent,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/event/create_event",
    event,
    responseHandler,
    errorHandler
  );
};
