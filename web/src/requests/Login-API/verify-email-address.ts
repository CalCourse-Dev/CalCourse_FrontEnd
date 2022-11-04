import { basePostRequest } from '../base-requests';

export const verifyEmailAddress = (
  email_address: string,
  verified_status: string,
  user_name: string,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/email/verify_google_email/" + email_address + "/" + 
        verified_status + "/" + user_name,
    null,
    responseHandler,
    errorHandler
  );
};
