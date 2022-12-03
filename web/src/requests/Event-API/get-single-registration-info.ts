import { baseGetRequest } from "../base-requests";

export const getSingleRegistrationInfo = (
    eventID: string,
    email: string,
    responseHandler: (data: any) => void,
    errorHandler: (error: any) => void
) => {
  baseGetRequest(
    "/event/get_single_registration_info/" + eventID + "/" + email,
    responseHandler,
    errorHandler
  );
};
