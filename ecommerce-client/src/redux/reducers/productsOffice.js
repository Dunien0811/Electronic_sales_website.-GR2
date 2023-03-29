import * as Types from '../../constants/ActionType';
let initialState = [];

const productOther = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS_OFFICE:
            state = action.products;
            return [...state];
        default: return [...state];
    }
};

export default productOther;