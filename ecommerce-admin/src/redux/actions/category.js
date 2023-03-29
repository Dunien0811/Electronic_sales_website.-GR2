import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { actShowLoading, actHiddenLoading } from './loading'
import 'react-toastify/dist/ReactToastify.css';

export const actFetchCategoriesRequest = (token, offset) => {
  const newOffset = offset === null || offset === undefined ? 0 : offset;
  const limit = 10;
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`categories?limit=${limit}&offset=${newOffset}&orderBy=-createdAt`, 'GET', null, token)
        .then(res => {
          if(res && res.status === 200) {
            dispatch(actFetchCategories(res.data.results));
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

export const actFetchCategories = categories => {
  return {
    type: Types.FETCH_CATEGORIES,
    categories
  }
}

export const actDeleteCategoryRequest = (id, token) => {
  return async dispatch => {
    await callApi(`categories/${id}`, 'DELETE', null, token);
    dispatch(actDeleteCategory(id));
  }
}

export const actFindCategoriesRequest = (token, searchText) => {
  return dispatch => {
  dispatch(actShowLoading());
  return new Promise((resolve, reject) => {
    if (searchText !== undefined && searchText !== null && searchText !== '') {
      callApi(`categories?q=${searchText}`, 'GET', null, token)
      .then(res => {
        if(res && res.status === 200) {
          dispatch(actFindCategories(res.data.results));
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
      callApi('categories', 'GET', null, token)
      .then(res => {
        if(res && res.status === 200) { 
          dispatch(actFindCategories(res.data.results));
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

export const actFindCategories = (categories) => {
  return {
    type: Types.FIND_CATEGORIES,
    categories
  }
}

export const actDeleteCategory = (id) => {
  return {
    type: Types.REMOVE_CATEGORY,
    id
  }
}

export const actAddCategoryRequest = (token, data) => {
  return async dispatch => {
    const res = await callApi('categories', 'POST', data, token);
    if (res && res.status === 200) {
      toast.success('Add new category is success')
      dispatch(actAddCategory(res.data));
    }
  }
}

export const actAddCategory = (data) => {
  return {
    type: Types.ADD_CATEGORY,
    data
  }
}

export const actGetCategoryRequest = (token, id) => {
  return async dispatch => {
    await callApi(`categories/${id}`, 'GET', null, token);
  };
}

export const actEditCategoryRequest = (token, id, data) => {
  return async dispatch => {
    const res = await callApi(`categories/${id}`, 'PUT', data, token);
    if (res && res.status === 200) {
      toast.success('Edit category is success')
      dispatch(actEditCategory(res.data));
    }
  }
}

export const actEditCategory = (data) => {
  return {
    type: Types.EDIT_CATEGORY,
    data
  }
}