import { basePostRequest } from '../base-requests';

export const postUser = (id: string, email: string, credits: number) => {
  basePostRequest(`user?user_id=${id}&user_email=${email}&user_credits=${credits}`, []);
};
