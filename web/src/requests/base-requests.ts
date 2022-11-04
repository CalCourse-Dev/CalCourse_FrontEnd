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
  requestBody: any = null, 
  responseHandler?: (data: any) => void,
  errorHandler?: (error: any) => void
) => {
  if (requestBody != null) {
    requestBody = JSON.stringify(requestBody);
  }
  
  fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(requestBody)
    })
    .then((response) => {
      if (response.status < 400) {
        return response.json();
      } else {
        return Promise.reject();
      }
    }) 
    .then(responseHandler || defaultResponseHandler)
    .catch(errorHandler || defaultErrorHandler);
  };

export const basePutRequest = (
  path: string,
  requestBody: any = null,
  responseHandler: (data: any) => void,
  errorHandler: (error: any) => void,
) => {
  if (requestBody != null) {
    requestBody = JSON.stringify(requestBody);
  }

  fetch(`${BASE_URL}/${path}`, {
    method: 'PUT',
    body: JSON.stringify(requestBody)
  })
  .then((response) => {
    if (response.status < 400) {
      return response.json();
    } else {
      return Promise.reject();
    }
  }) 
  .then(responseHandler || defaultResponseHandler)
  .catch(errorHandler || defaultErrorHandler);
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
    .then((response) => {
      if (response.status < 400) {
        return response.json();
      } else {
        return Promise.reject();
      }
    }) 
    .then(defaultResponseHandler)
    .catch(defaultErrorHandler);

};

export const defaultErrorHandler = (e?: any) => {
  console.log(e);
};

export const defaultResponseHandler = (data?: any) => {
  console.log(data);
};
