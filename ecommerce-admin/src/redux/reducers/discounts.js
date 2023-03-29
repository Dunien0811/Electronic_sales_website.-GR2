import * as Types from './../../constants/ActionType';
let initialState = [];

const findIndexs = (id, state) => {
    let result = -1;
    state.forEach((item, index) => {
        if (item.id === id) {
            result = index;
        }
    });
    return result;
}

const discounts = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case Types.FETCH_DISCOUNTS:
            state = action.discounts;
            return [...state];
        case Types.REMOVE_DISCOUNT:
            index = findIndexs(action.id, state);
            state.splice(index, 1);
            return [...state];
        default: return [...state];
    }
};

export default discounts;