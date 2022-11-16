import { baseGetRequest } from '../base-requests';

export const getAllEvents = (
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  baseGetRequest(
    "/event/get_all_events",
    responseHandler,
    errorHandler
  );
};
