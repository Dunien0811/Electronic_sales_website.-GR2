import * as Types from './../../constants/ActionType';
let initialState = []

const infoMe = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_ME:
            state = action.user;
            return [ ...state ];
        default: return [ ...state ];
    }
};

export default infoMe;