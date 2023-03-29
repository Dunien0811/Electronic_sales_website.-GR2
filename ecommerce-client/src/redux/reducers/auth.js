import * as Types from './../../constants/ActionType';
let initialState = [];

const user = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            state = action.token;
            return state;
        case Types.TOKEN_REDUX:
            state = action.token;
            return state;
        default: return state;
    }
};

export default user;