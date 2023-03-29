import * as Types from './../../constants/ActionType';
let initialState = [];

const products = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case Types.SEARCH_PRODUCTS:
            state = action.products;
            return [...state];
        case Types.FETCH_CATEGORIES_PRODUCT:
            state = action.products;
            return [...state];
        default: return [...state];
    }
};

export default products;