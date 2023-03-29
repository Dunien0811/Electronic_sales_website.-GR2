import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actShowLoading, actHiddenLoading } from './loading'

export const actFetchDiscountsRequest = (token) => {
  return async dispatch => {
    dispatch(actShowLoading());
      const res = await callApi('discounts', 'GET', null, token);
      if(res && res.status === 200) {
        dispatch(actFetchDiscounts(res.data.results));
      }
      dispatch(actHiddenLoading());
  };
}

export const actFetchDiscounts = (discounts) => {
  return {
      type : Types.FETCH_DISCOUNTS,
      discounts
  }
}

export const actDeleteDiscountRequest = (id, token) => {
  return async dispatch => {
    await callApi(`discounts/${id}`, 'DELETE', null, token);
    dispatch(actDeleteDiscount(id));
  }
}

export const actDeleteDiscount = (id) => {
  return {
      type : Types.REMOVE_DISCOUNT,
      id
  }
}