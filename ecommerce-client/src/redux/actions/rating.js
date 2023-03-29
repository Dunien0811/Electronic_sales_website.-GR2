import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';

export const actFetchRatingsRequest = (productId) => {
  return async dispatch => {
    const res = await callApi(`product/${productId}/ratings?orderBy=-createdAt`, 'GET', null);
    if (res && res.status === 200) {
      dispatch(actFetchRatings(res.data));
    }
  };
}

export const actFetchRatings = (ratings) => {
  return {
    type: Types.FETCH_RATINGS,
    ratings
  }
}
export const actAddRatingRequest = (productId, rating, token) => {
  return async dispatch => {
    const res = await callApi(`product/${productId}/ratings`, 'POST', rating, token);
    if (res && res.status === 200) {
      dispatch(actAddRatings(res.data));
      toast.success('Add rating is success')
    }
  };
}

export const actAddRatings = (rating) => {
  return {
    type: Types.ADD_RATING,
    rating
  }
}


//Favorite
export const actFetchFavoritesRequest = (token) => {
  return async dispatch => {
    const res = await callApi('favorites', 'GET', null, token);
    if (res && res.status === 200) {
      dispatch(actFetchFavorites(res.data.results));
    }
  };
}

export const actFetchFavorites = (favorites) => {
  return {
    type: Types.FETCH_FAVORITES,
    favorites
  }
}

export const actAddFavoriteRequest = (productId, token) => {
  return async dispatch => {
    const res = await callApi(`favorites/product/${productId}`, 'POST', null, token);
    if (res && res.status === 200) {
      toast.success('Add favorite is success')
      dispatch(actAddFavorite(res.data));
    }
  };
}

export const actAddFavorite = (favorite) => {
  return {
    type: Types.ADD_FAVORITE,
    favorite
  }
}

export const actDeleteFavoriteRequest = (id, token) => {
  return async dispatch => {
    dispatch(actDeleteFavorite(id));
    callApi(`favorites/${id}`, 'DELETE', null, token);
    
  };
}

export const actDeleteFavorite = (id) => {
  return {
    type: Types.REMOVE_FAVORITE,
    id
  }
}
