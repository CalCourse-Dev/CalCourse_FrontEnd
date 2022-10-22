// Change this to true to enable production mode
const production = false;

// Constants for development
const DEV_APP_BASE_URL: string = 'http://localhost:3000';
const DEV_API_BASE_URL = `https://lzc836cp7g.execute-api.us-west-1.amazonaws.com/Testing`;  //API Gateway URL

// Constants for production
const PROD_APP_BASE_URL: string = "https://calcourse.com/";
const PROD_API_BASE_URL = `https://j2xnmuiw4k.execute-api.us-west-1.amazonaws.com/CalCourse`;




export const CONSTANTS = {
  AWS_API_BASE_URL: production ? PROD_API_BASE_URL : DEV_API_BASE_URL,
  AWS_REGION: "us-west-1",
  APP_BASE_URL: production ? PROD_APP_BASE_URL : DEV_APP_BASE_URL,
};
