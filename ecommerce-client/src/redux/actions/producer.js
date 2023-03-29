import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';

export const actFetchProducersRequest = (id) => {
  return async dispatch => {
    const res = await callApi(`category/${id}/producers`, 'GET', null, null);
    if (res && res.status === 200) {
      dispatch(actFetchProducers(res.data));
    }
  };
}

export const actFetchProducers = (producers) => {
  return {
    type: Types.FETCH_PRODUCERS,
    producers
  }
}

