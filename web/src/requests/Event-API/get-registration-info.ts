import { baseGetRequest } from "../base-requests";

export const getRegistrationInfo = (
    eventID: string,
    responseHandler: (data: any) => void,
    errorHandler: (error: any) => void
) => {
    baseGetRequest(
    "/event/get_registration_info/" + eventID,
    responseHandler,
    errorHandler
  );
};
