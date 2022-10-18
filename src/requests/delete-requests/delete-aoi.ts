import { baseDeleteRequest } from '../base-requests';

export const deleteAoi = (id: string, name: string) => {
  baseDeleteRequest(`aoi?image_id=${id}&name=${name}`);
};
