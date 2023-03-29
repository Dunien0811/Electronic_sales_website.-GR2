import * as Types from '../../constants/ActionType';
let initialState = [];

const productsLaptop = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS_LAPTOP:
            state = action.products;
            return [...state];
        default: return [...state];
    }
};

export default productsLaptop;