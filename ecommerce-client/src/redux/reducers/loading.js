import * as Types from './../../constants/ActionType';
let initialState = false;

const loading = (state = initialState, action) => {
  switch (action.type) {
    case Types.SHOWLOADING:
      state = action.status;
      return state;
    case Types.HIDDENLOADING:
      state = action.status;
      return state;
    default: return state;
  }
};

export default loading;