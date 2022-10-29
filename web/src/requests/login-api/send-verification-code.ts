import { basePostRequest } from '../base-requests';

export const sendVerificationCode = (
  email_address: string,
  data: any,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/email/send_verification_code/" + email_address,
    data,
    responseHandler,
    errorHandler
  );
};
