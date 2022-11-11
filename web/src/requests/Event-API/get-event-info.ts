import { baseGetRequest } from '../base-requests';

export const getEventInfo = (
  eventID: string,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  baseGetRequest(
    "/event/get_event_info/" + eventID,
    responseHandler,
    errorHandler
  );
};
