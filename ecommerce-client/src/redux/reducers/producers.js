import * as Types from './../../constants/ActionType';
let initialState = [];

const producers = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCERS:
            state = action.producers;
            return [...state];
        default: return [...state];
    }
};

export default producers;