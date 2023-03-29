import * as Types from './../../constants/ActionType';
let initialState = [];

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_DASHBOARD:
      state = action.data;
      return { ...state };
    default: return { ...state };
  }
};

export default user;