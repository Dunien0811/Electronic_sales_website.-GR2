import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actShowLoading, actHiddenLoading } from './loading'

export const actFetchRolesRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`roles?limit=${limit}&offset=${newOffset}`, 'GET', null, token)
        .then(res => {
          if (res && res.status === 200) {
            dispatch(actFetchRoles(res.data.results));
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

export const actFetchRoles = (roles) => {
  return {
    type: Types.FETCH_ROLES,
    roles
  }
}

export const actFindRolesRequest = (token, searchText) => {
  return dispatch => {
  dispatch(actShowLoading());
  return new Promise((resolve, reject) => {
    if (searchText !== undefined && searchText !== null && searchText !== '') {
      callApi(`roles?q=${searchText}`, 'GET', null, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actFindRoles(res.data.results));
          resolve(res.data);
          setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
        setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
      });
    } else {
      callApi('roles', 'GET', null, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actFindRoles(res.data.results));
          resolve(res.data);
          setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
        setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
      });
    }
  });
}
}

export const actFindRoles = (roles) => {
  return {
    type: Types.FIND_ROLES,
    roles
  }
}

export const actDeleteRoleRequest = (id, token) => {
  return async dispatch => {
    await callApi(`roles/${id}`, 'DELETE', null, token);
    dispatch(actDeleteRole(id));
  }
}

export const actDeleteRole = (id) => {
  return {
    type: Types.REMOVE_ROLE,
    id
  }
}

export const actAddRoleRequest = (token, data) => {
  return async dispatch => {
    const res = await callApi('roles', 'POST', data, token);
    if (res && res.status === 200) {
      toast.success('Add new role is success')
      dispatch(actAddRole(res.data));
    }
  }
}

export const actAddRole = (data) => {
  return {
    type: Types.ADD_ROLE,
    data
  }
}

export const actGetRoleRequest = (token, id) => {
  return async dispatch => {
    await callApi(`roles/${id}`, 'GET', null, token);
  };
}

export const actEditRoleRequest = (token, id, data) => {
  return async dispatch => {
    const res = await callApi(`roles/${id}`, 'PUT', data, token);
    if (res && res.status === 200) {
      await dispatch(actEditRole(res.data));
      toast.success('Edit role is success')
    }
  }
}

export const actEditRole = (data) => {
  return {
    type: Types.EDIT_ROLE,
    data
  }
}