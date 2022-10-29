import { basePostRequest } from '../base-requests';

export const verifyAuthenticationCode = (
  email_address: string,
  authentication_code: string,
  data: any,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/email/verify_authentication_code/" + email_address +
        "/" + authentication_code,
    data,
    responseHandler,
    errorHandler
  );
};
