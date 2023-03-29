import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';

export const actFetchCategoriesRequest = () => {
    return async dispatch => {
        const res = await callApi('categories', 'GET', null);
        if ( res && res.status === 200 ) {
            dispatch(actFetchCategories(res.data.results));
        }      
    };
}

export const actFetchCategories = (categories) => {
    return {
        type : Types.FETCH_CATEGORIES,
        categories
    }
}