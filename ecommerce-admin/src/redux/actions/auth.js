import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actShowLoading, actHiddenLoading } from './loading'
toast.configure()

export const actLoginRequest = (user) => {
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi('auth/loginAdmin', 'POST', user)
        .then(res => {
          if(res && res.status === 200) {
            const token = res.data.token
            const nameRole = res.data.scope
            localStorage.setItem('_auth', token);
            dispatch(actLogin(token));
            dispatch(actGetNameRole(nameRole));
            resolve(res.data);
            setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
          setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
        });
    });
  };
};

export const actLogin = (token) => {
  return {
    type: Types.LOGIN,
    token
  }
}

export const actGetNameRole = (role) => {
  return {
    type: Types.GET_NAMEROLE,
    role
  }
}

export const actGetMeRequest = (token) => {
  return async dispatch => {
    const res = await callApi('users/me', 'GET', null, token);
    if (res && res.status === 200) {
      dispatch(actGetMe(res.data.results));
    }
  };
}

export const actGetMe = (user) => {
  return {
    type: Types.GET_ME,
    user
  }
}


export const actTokenRequest = (token) => {
  return async dispatch => {
    dispatch(actToken(token));
  };
}

export const actToken = (token) => {
  return {
    type: Types.TOKEN_REDUX,
    token
  }
}

export const actForgotPasswordRequest = (email) => {
  return async () => {
    const res = await callApi('auth/forgotPassword', 'POST', email);
    if (res && res.status === 200) {
      toast.success('Reset password is successful, please check your email!')
    }
  };
}

