// Change this to true to enable production mode
const production = true;

// Constants for development
const DEV_PAYMENT_SUCCESS_REDIRECT_URL: string = 'http://localhost:3000/payment_success/';
const DEV_LANDING_PAGE_URL: string = 'http://localhost:3001/';
const DEV_SERVER_BASE_URL: string = 'http://localhost:8080';
const DEV_APP_BASE_URL: string = 'http://localhost:3000';
const DEV_STRIPE_PUBLIC_KEY: string =
  'pk_test_51LLZ2oCUFtnlzs6tKlZo8LBrmiAc6wCcBosT7EduMJiycmWuiPF4R8JiAwJRFcyDIyZ2ye6DMqyHfeUbHo1O5uL100HXO9Kpgx';

// Constants for production
const PROD_PAYMENT_SUCCESS_REDIRECT_URL: string = 'http://app.markit.ai/payment_success/';
const PROD_LANDING_PAGE_URL: string = 'http://markit.ai/';
const PROD_APP_BASE_URL: string = 'http://app.markit.ai';
const PROD_SERVER_BASE_URL: string = 'https://www.markit-server.com:443';
const PROD_STRIPE_PUBLIC_KEY: string =
  'pk_live_51LLZ2oCUFtnlzs6t7hWjr9uX0jkCcSdIuYFQOwWmVD1EIQ91ifY1ATDWVL66Hy9G29L8uEQseQ91PeyUHisd33kC0031grK2Ve';

//API Gateway URL
// export const BASE_URL = `https://qdwuvmtdfa.execute-api.us-west-1.amazonaws.com/t1`;

export const STRIPE_PRICE_ID = {
  Individual: 'price_1LSJjzCUFtnlzs6tlsqw6CCP',
  Team: 'price_1LSJjjCUFtnlzs6tYCqDmDzm',
  Enterprise: 'price_1LOwuSCUFtnlzs6t1CdINMie'
};

export const CONSTANTS = {
  LANDING_PAGE_URL: production ? PROD_LANDING_PAGE_URL : DEV_LANDING_PAGE_URL,
  STRIPE_PUBLIC_KEY: production ? PROD_STRIPE_PUBLIC_KEY : DEV_STRIPE_PUBLIC_KEY,
  SERVER_BASE_URL: production ? PROD_SERVER_BASE_URL : DEV_SERVER_BASE_URL,
  PAYMENT_SUCCESS_REDIRECT_URL: production
    ? PROD_PAYMENT_SUCCESS_REDIRECT_URL
    : DEV_PAYMENT_SUCCESS_REDIRECT_URL,
  AWS_REGION: 'us-west-1',
  AWS_COGNITO_USER_POOL_ID: 'us-west-1_VOmFxHn4c',
  AWS_COGNITO_WEB_CLIENT_ID: '21s48deopqfntc1g362mr2qui0',
  APP_BASE_URL: production ? PROD_APP_BASE_URL : DEV_APP_BASE_URL
};
