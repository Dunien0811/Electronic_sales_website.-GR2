import * as Types from '../../constants/ActionType';
let initialState = [];

const productsNew = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS_NEW:
            state = action.products;
            return [...state];
        default: return [...state];
    }
};

export default productsNew;