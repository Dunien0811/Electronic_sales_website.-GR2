import * as Types from './../../constants/ActionType';
let initialState = [];

const product = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCT:
            state = action.product;
            return  {...state};
        default: return {...state};
    }
};

export default product;