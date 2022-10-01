import { basePostRequest } from '../base-requests';
import { defaultErrhandler, defaultReshandler } from '../base-requests';

export const postAoi = (
  id: string,
  loc: number[],
  name: string,
  responseHandler: (data: any) => void
) => {
  basePostRequest(
    `aoi?image_id=${id}&loc=[${loc}]&name=${name}`,
    [],
    responseHandler,
    defaultErrhandler
  );
};
