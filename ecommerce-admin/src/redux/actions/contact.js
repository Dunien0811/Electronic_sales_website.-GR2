import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actShowLoading, actHiddenLoading } from './loading'

export const actFetchContactsRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`contacts?limit=${limit}&offset=${newOffset}&orderBy=-createdAt`, 'GET', null, token)
        .then(res => {
          if(res && res.status === 200) { 
            dispatch(actFetchContacts(res.data.results));
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

export const actFetchContacts = (contacts) => {
  return {
    type: Types.FETCH_CONTACTS,
    contacts
  }
}

export const actFindContactsRequest = (token, searchText) => {
  return dispatch => {
  dispatch(actShowLoading());
  return new Promise((resolve, reject) => {
    if (searchText !== undefined && searchText !== null && searchText !== '') {
      callApi(`contacts?q=${searchText}`, 'GET', null, token)
      .then(res => {
        if(res && res.status === 200) {  
          dispatch(actFindContacts(res.data.results));
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
      callApi('contacts', 'GET', null, token)
      .then(res => {
        if(res && res.status === 200) {  
          dispatch(actFindContacts(res.data.results));
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

export const actFindContacts = (contacts) => {
  return {
    type: Types.FIND_CONTACTS,
    contacts
  }
}

export const actDeleteContactRequest = (id, token) => {
  return async dispatch => {
    await callApi(`contacts/${id}`, 'DELETE', null, token);
    dispatch(actDeleteContact(id));
  }
}

export const actDeleteContact = (id) => {
  return {
    type: Types.REMOVE_CONTACT,
    id
  }
}

export const actAddContactRequest = (token, data) => {
  return async dispatch => {
    const res = await callApi('contacts', 'POST', data, token);
    if (res && res.status === 200) {
      toast.success('Add new Contact is success')
      dispatch(actAddContact(res.data));
    }
  }
}

export const actAddContact = (data) => {
  return {
    type: Types.ADD_CONTACT,
    data
  }
}

export const actGetContactRequest = (token, id) => {
  return async dispatch => {
    await callApi(`contacts/${id}`, 'GET', null, token);
  };
}

export const actEditContactRequest = (token, id, data) => {
  return async dispatch => {
    const res = await callApi(`contacts/${id}`, 'PUT', data, token);
    if (res && res.status === 200) {
      await dispatch(actEditContact(res.data));
      toast.success('Edit Contact is success')
    }
  }
}

export const actEditContact = (data) => {
  return {
    type: Types.EDIT_CONTACT,
    data
  }
}