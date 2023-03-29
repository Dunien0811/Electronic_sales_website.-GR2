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

const producers = (state = initialState, action) => {
    let index = -1;
    switch (action.type) {
        case Types.FETCH_PRODUCERS:
            state = action.producers;
            return [...state];
        case Types.ADD_PRODUCER:
            state.push(action.data);
            return [...state];
        case Types.REMOVE_PRODUCER:
            index = findIndexs(action.id, state);
            state.splice(index, 1);
            return [...state];
        case Types.EDIT_PRODUCER:
            index = findIndexs(action.data.id, state);
            state[index] = { ...action.data };
            return [...state];
        case Types.FIND_PRODUCERS:
            state = action.producers;
            return [...state];
        default: return [...state];
    }
};

export default producers;