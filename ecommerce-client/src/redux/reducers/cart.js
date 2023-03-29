import * as Types from './../../constants/ActionType';
let initialState = [];
let index = -1;

const findIndexs = (id, state) => {
    index = state.findIndex(e => e.id === id)
    return index;
}
const products = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_CART:
            state = action.items;
            return [...state];
        case Types.ADD_CART:
            state.push(action.item);
            return [...state];
        case Types.UPDATE_CART:
            index = findIndexs(action.item.id, state);
            state[index] = { ...action.item };
            return [...state];
        case Types.REMOVE_CART:
            index = findIndexs(action.item.id, state);
            state.splice(index, 1);
            return [...state];
        case Types.CLEAR_CART:
            state = [];
            return [...state];
        default: return [...state];
    }
};

export default products;