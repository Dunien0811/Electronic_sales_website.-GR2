import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actShowLoading, actHiddenLoading } from './loading'

export const actFetchProducersRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`producers?limit=${limit}&offset=${newOffset}`, 'GET', null, token)
        .then(res => {
          if (res && res.status === 200) {
            dispatch(actFetchProducers(res.data.results));
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

export const actFetchProducers = (producers) => {
  return {
    type: Types.FETCH_PRODUCERS,
    producers
  }
}

export const actFindProducersRequest = (token, searchText) => {
  return dispatch => {
  dispatch(actShowLoading());
  return new Promise((resolve, reject) => {
    if (searchText !== undefined && searchText !== null && searchText !== '') {
      callApi(`producers?q=${searchText}`, 'GET', null, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actFindProducers(res.data.results));
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
      callApi('producers', 'GET', null, token)
      .then(res => {
        if (res && res.status === 200) {
          dispatch(actFindProducers(res.data.results));
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

export const actFindProducers = (producers) => {
  return {
    type: Types.FIND_PRODUCERS,
    producers
  }
}

export const actDeleteProducerRequest = (id, token) => {
  return async dispatch => {
    await callApi(`producers/${id}`, 'DELETE', null, token);
    dispatch(actDeleteProducer(id));
  }
}

export const actDeleteProducer = (id) => {
  return {
    type: Types.REMOVE_PRODUCER,
    id
  }
}

export const actAddProducerRequest = (token, data) => {
  return async dispatch => {
    const res = await callApi('producers', 'POST', data, token);
    if (res && res.status === 200) {
      toast.success('Add new Producer is success')
      dispatch(actAddProducer(res.data));
    }
  }
}

export const actAddProducer = (data) => {
  return {
    type: Types.ADD_PRODUCER,
    data
  }
}

export const actGetProducerRequest = (token, id) => {
  return async dispatch => {
    await callApi(`producers/${id}`, 'GET', null, token);
  };
}

export const actEditProducerRequest = (token, id, data) => {
  return async dispatch => {
    const res = await callApi(`producers/${id}`, 'PUT', data, token);
    if (res && res.status === 200) {
      toast.success('Edit Producer is success')
      dispatch(actEditProducer(res.data));
    }
  }
}

export const actEditProducer = (data) => {
  return {
    type: Types.EDIT_PRODUCER,
    data
  }
}