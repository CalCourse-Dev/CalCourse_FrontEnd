import { sendVerificationCode } from './login-api/send-verification-code';
import { verifyAuthenticationCode } from './login-api/verify-authentication-code';
import { verifyEmailAddress } from './login-api/verify-email-address';

const LoginAPI = {
  sendVerificationCode,
  verifyAuthenticationCode,
  verifyEmailAddress
};

export default LoginAPI;
