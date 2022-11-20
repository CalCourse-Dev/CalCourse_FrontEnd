import { basePostRequest } from "../base-requests";

export const sendVerificationCode = (
  email_address: string,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/email/send_verification_code/" + email_address,
    null,
    responseHandler,
    errorHandler
  );
};
