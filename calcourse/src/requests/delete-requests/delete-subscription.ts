import { baseDeleteRequest } from '../base-requests';

export const deleteSubscription = (user_id: string) => {
  baseDeleteRequest(`payment?user_id=${user_id}`);
};
