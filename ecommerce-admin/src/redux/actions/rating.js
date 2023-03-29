import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actShowLoading, actHiddenLoading } from './loading'

export const actFetchRatingsRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`ratings?limit=${limit}&offset=${newOffset}&orderBy=-createdAt`, 'GET', null, token)
        .then(res => {
          dispatch(actFetchRatings(res.data.results));
          resolve(res.data);
          setTimeout(function(){ dispatch(actHiddenLoading()) }, 200)
        })
        .catch(err => {
          console.log(err);
          reject(err);
          setTimeout(function(){ dispatch(actHiddenLoading()) }, 200)
        });
    });
  };
};

export const actFetchRatings = (ratings) => {
  return {
    type: Types.FETCH_RATINGS,
    ratings
  }
}

export const actFindRatingsRequest = (token, searchText) => {
  return dispatch => {
  dispatch(actShowLoading());
  return new Promise((resolve, reject) => {
    if (searchText !== undefined && searchText !== null && searchText !== '') {
      callApi(`ratings?q=${searchText}`, 'GET', null, token)
      .then(res => {
        if (res && res.status === 200) { 
          dispatch(actFindRatings(res.data.results));
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
      callApi('ratings', 'GET', null, token)
      .then(res => {
        if (res && res.status === 200) { 
          dispatch(actFindRatings(res.data.results));
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

export const actFindRatings = (ratings) => {
  return {
    type: Types.FIND_RATINGS,
    ratings
  }
}

export const actDeleteRatingRequest = (id, token) => {
  return async dispatch => {
    await callApi(`ratings/${id}`, 'DELETE', null, token);
    dispatch(actDeleteRating(id));
  }
}

export const actDeleteRating = (id) => {
  return {
    type: Types.REMOVE_RATING,
    id
  }
}

export const actAddRatingRequest = (token, data) => {
  return async dispatch => {
    const res = await callApi('ratings', 'POST', data, token);
    if (res && res.status === 200) {
      toast.success('Add new Rating is success')
      dispatch(actAddRating(res.data));
    }
  }
}

export const actAddRating = (data) => {
  return {
    type: Types.ADD_RATING,
    data
  }
}

export const actGetRatingRequest = (token, id) => {
  return async dispatch => {
    await callApi(`ratings/${id}`, 'GET', null, token);
  };
}

export const actEditRatingRequest = (token, id, data) => {
  return async dispatch => {
    const res = await callApi(`ratings/${id}`, 'PUT', data, token);
    if (res && res.status === 200) {
      await dispatch(actEditRating(res.data));
      toast.success('Edit Rating is success')
    }
  }
}

export const actEditRating = (data) => {
  return {
    type: Types.EDIT_RATING,
    data
  }
}