import { RegisterInfo } from '../../utils/interfaces/interfaces';
import { basePostRequest } from '../base-requests';

export const registerEvent = (
  regInfo: RegisterInfo,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void
) => {
  basePostRequest(
    "/event/register",
    regInfo,
    responseHandler,
    errorHandler
  );
};
