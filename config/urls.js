const BASE_URL = 'http://localhost:11236/';
//const API_URL = '/api/v1';
const API_URL = 'CardSystemDeviceCode.asmx'

export const OAUTH_CLIENT_ID = 1;
export const OAUTH_CLIENT_SECRECT = 'fbxP1y7gQRko3woq386WfQZF6I0p3JCupDrnWUEx';

// User
export const USER_URL = `${BASE_URL}${API_URL}/users`;
export const USER_REGISTER_URL = `${BASE_URL}${API_URL}/oauth/register`;
export const getResendVerifyURL = email => `${BASE_URL}${API_URL}/users/${email}/resend`;
export const USER_FORGOT_PASSWORD_URL = `${BASE_URL}${API_URL}/password/email`;

//CardService
export const VALIDATE_CARD = `${API_URL}`
