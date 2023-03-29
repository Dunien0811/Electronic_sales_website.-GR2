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

const users = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case Types.FETCH_USERS:
            state = action.users;
            return [...state];
        case Types.ADD_USER:
            state.push(action.data);
            return [...state];
        case Types.REMOVE_USER:
            index = findIndexs(action.id, state);
            state.splice(index, 1);
            return [...state];
        case Types.EDIT_USER:
            index = findIndexs(action.data.id, state);
            state[index] = { ...action.data };
            return [...state];
        case Types.FIND_USERS:
            state = action.users;
            return [...state];
        default: return [...state];
    }
};

export default users;