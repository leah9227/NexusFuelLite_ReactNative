import {
  AUTH_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
  PERSONAL_ACCESS_TOKEN,
  getResendVerifyURL,
  USER_FORGOT_PASSWORD_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRECT,
} from '../config/urls';

export function signInInit() {
  return {
    type: 'SIGNIN_INIT',
  };
}

export function loginInit() {
  return {
    type: 'LOGIN_INIT',
  };
}

export function forgotPasswordInit() {
  return {
    type: 'FORGOT_PASSWORD_INIT',
  };
}

export function forgotPasswordEnd() {
  return {
    type: 'FORGOT_PASSWORD_END',
  };
}

export function loginRequest(email, password) {
  return {
    type: 'LOGIN_REQUEST',
    payload: { email, password },
  };
}

export function loginSuccess(response) {
  const payload = response;
  return {
    type: 'LOGIN_SUCCESS',
    payload,
  };
}

export function loginFailure(message) {
  return {
    type: 'LOGIN_FAILURE',
    payload: { message },
  };
}

export function logout() {
  return {
    type: 'LOGOUT_REQUEST',
  };
}

export function loginFetch(email, password) {
  return (dispatch) => {
    dispatch(loginRequest(email, password));

    const data = {
      PersonalAccessToken: PERSONAL_ACCESS_TOKEN,
      Email: email,
      Password: password,
    };
    const body = Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

    return fetch(USER_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then(response => response.json())
      .then((json) => {
        if (json.failed) {
          dispatch(loginFailure(json.errorMessages[0]));
        } else {
          console.log(`THE RESPONSE ${JSON.stringify(json.result)}`);
          dispatch(loginSuccess(json.result));
        }
      })
      .catch(() => {
        dispatch(loginFailure('Error inesperado'));
      });
  };
}

export function signInRequest(name, lastName, email, password, phoneNumber, response = '') {
  return {
    type: 'SIGNIN-REQUEST',
    payload: {
      name, lastName, email, password, phoneNumber, response,
    },
  };
}

export function signInSuccess(response) {
  return {
    type: 'SIGNIN_SUCCESS',
    payload: { response },
  };
}

export function signInFailure(response) {
  return {
    type: 'SIGNIN_FAILURE',
    payload: { response },
  };
}

export function signInFetch(name, lastName, email, password, phoneNumber) {
  return (dispatch) => {
    dispatch(signInRequest(name, lastName, email, password, phoneNumber));
    const data = {
      PersonalAccessToken: PERSONAL_ACCESS_TOKEN,
      Name: name,
      LastName: lastName,
      Email: email,
      Password: password,
      Phone: phoneNumber,
    };
    const body = Object.keys(data)
      .map(key => data[key] && `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
    return fetch(USER_REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then(response => response.json())
      .then((json) => {
        console.log({ json });
        if (json.failed) {
          dispatch(signInFailure(json.errorMessages[0]));
        } else {
          dispatch(signInSuccess('Registro exitoso'));
        }
      })
      .catch(() => {
        dispatch(loginFailure('Error inesperado'));
      });
  };
}

export function resendVerifyFailure(response) {
  return {
    type: 'RESEND_VERIFY_FAILURE',
    payload: { response },
  };
}

export function resendVerifySuccess(response) {
  return {
    type: 'RESEND_VERIFY_SUCCESS',
    payload: { response },
  };
}

export function resendVerify(email) {
  return (dispatch) => {
    return fetch(getResendVerifyURL(email), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => response.json())
      .then((json) => {
        if (Object.prototype.hasOwnProperty.call(json, 'error')) {
          dispatch(resendVerifyFailure(''));
        } else {
          dispatch(resendVerifySuccess(''));
        }
      })
      .catch((error) => {
        dispatch(resendVerifyFailure(''));
      });
  };
}

export function forgotPasswordFailure(response) {
  return {
    type: 'FORGOT_PASSWORD_FAILURE',
    payload: { response },
  };
}

export function forgotPasswordSuccess(email, response) {
  return {
    type: 'FORGOT_PASSWORD_SUCCESS',
    payload: { email, response },
  };
}

export function forgotPassword(email) {
  return (dispatch, getState) => {
    const { auth } = getState();
    const theEmail = auth.get('email') !== '' ? auth.get('email') : email;
    return fetch(USER_FORGOT_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: theEmail,
      }),
    })
      .then(response => response.json())
      .then((json) => {
        if (Object.prototype.hasOwnProperty.call(json, 'error')) {
          dispatch(forgotPasswordFailure(json.error));
        } else {
          dispatch(forgotPasswordSuccess(theEmail, json.data));
        }
      })
      .catch((error) => {
        dispatch(forgotPasswordFailure(error));
      });
  };
}
