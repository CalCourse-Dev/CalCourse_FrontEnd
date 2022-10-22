// Use only in deployment mode

import { CONSTANTS } from '../utils/constants';

const BASE_URL = CONSTANTS.AWS_API_BASE_URL;

type GetRequestParams = {
  [key: string]: string;
};

export const baseGetRequest = (
  path: string,
  params: GetRequestParams[],
  responseHandler: (data: any) => void,
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
      if (response.status < 400) {
        // status < 400 means the request was successful
        return response.json();
      } else {
        return Promise.reject();
      }
    }) 
    .then(responseHandler)
    .catch(errorHandler);
};

export const basePostRequest = (
  path: string,
  data: any,
  // eslint-disable-next-line
  responseHandler?: (data: any) => void,
  // eslint-disable-next-line
  errorHandler?: (error: any) => void
) => {
  fetch(`${BASE_URL}/${path}`, {
    method: "POST",
    // headers: {
    //   Authorization: `${idToken}`
    // },
    body: data,
  })
    .then((response) => response.json())
    .then(responseHandler || defaultResponseHandler)
    .catch(errorHandler || defaultErrorHandler);
};

export const basePutRequest = (
  path: string,
  data: any,
  responseHandler: (data: any) => void,
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
) => {
    fetch(`${BASE_URL}/${path}`, {
      method: "DELETE",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      //   "enctype=multipart/form-data"
      // },
    })
      .then((response) => response.json())
      .then(defaultResponseHandler)
      .catch(defaultErrorHandler);

};

export const defaultErrorHandler = (e?: any) => {
  console.log(e);
};

export const defaultResponseHandler = (data?: any) => {
  console.log(data);
};
