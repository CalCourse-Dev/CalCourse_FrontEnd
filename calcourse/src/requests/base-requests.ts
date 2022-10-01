// Use only in deployment mode

import { Auth } from 'aws-amplify';
import { CONSTANTS } from '../utils/constants';

const BASE_URL = CONSTANTS.SERVER_BASE_URL;
export const getIdToken = async () => {
  const idToken = await Auth.currentSession().then((session) => session.getIdToken().getJwtToken());
  return idToken;
};

type GetRequestParams = {
  [key: string]: string;
};

export const baseGetRequest = (
  path: string,
  params: GetRequestParams[],
  // eslint-disable-next-line
  responseHandler: (data: any) => void,
  // eslint-disable-next-line
  errorHandler: (error: any) => void
) => {
  let url = `${BASE_URL}/${path}`;

  fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      return response.status < 400 ? response.json() : Promise.reject();
    })
    .then(responseHandler)
    .catch(errorHandler);
};

export const basePostRequest = (
  path: string,
  // eslint-disable-next-line
  data: any,
  // eslint-disable-next-line
  responseHandler?: (data: any) => void,
  // eslint-disable-next-line
  errorHandler?: (error: any) => void
) => {
  fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    // headers: {
    //   Authorization: `${idToken}`
    // },
    body: data
  })
    .then((response) => response.json())
    .then(responseHandler || defaultReshandler)
    .catch(errorHandler || defaultErrhandler);
};

export const basePutRequest = (
  path: string,
  // eslint-disable-next-line
  data: any,
  // eslint-disable-next-line
  responseHandler: (data: any) => void,
  // eslint-disable-next-line
  errorHandler: (error: any) => void
) => {
  fetch(`${BASE_URL}/${path}`, {
    method: 'PUT',
    body: data
  })
    .then((response) => response.json())
    .then(responseHandler)
    .catch(errorHandler);
};

export const baseDeleteRequest = (
  path: string
  // eslint-disable-next-line
) => {
  
    fetch(`${BASE_URL}/${path}`, {
      method: 'DELETE'
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      //   "enctype=multipart/form-data"
      // },
    })
      .then((response) => response.json())
      .then(defaultReshandler)
      .catch(defaultErrhandler);

};

export const defaultErrhandler = (e?: any) => {
  console.log(e);
};
export const defaultReshandler = (data?: any) => {};
