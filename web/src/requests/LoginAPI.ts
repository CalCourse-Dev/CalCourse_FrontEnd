import { sendVerificationCode } from './Login-API/send-verification-code';
import { verifyAuthenticationCode } from './Login-API/verify-authentication-code';
import { verifyEmailAddress } from './Login-API/verify-email-address';

const LoginAPI = {
  sendVerificationCode,
  verifyAuthenticationCode,
  verifyEmailAddress
};

export default LoginAPI;
