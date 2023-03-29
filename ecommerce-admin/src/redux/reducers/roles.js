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

const roles = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case Types.FETCH_ROLES:
            state = action.roles;
            return [...state];
        case Types.ADD_ROLE:
            state.push(action.data);
            return [...state];
        case Types.REMOVE_ROLE:
            index = findIndexs(action.id, state);
            state.splice(index, 1);
            return [...state];
        case Types.EDIT_ROLE:
            index = findIndexs(action.data.id, state);
            state[index] = { ...action.data };
            return [...state];
        case Types.FIND_ROLES:
            state = action.roles;
            return [...state];
        default: return [...state];
    }
};

export default roles;