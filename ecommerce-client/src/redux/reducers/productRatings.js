import * as Types from './../../constants/ActionType';
let initialState = [];

const productRatings = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_RATINGS:
      state = action.ratings;
      return [...state];
    case Types.ADD_RATING:
      // state.push(action.rating);
      state.splice(0, 0, action.rating);
      return [...state];
    default: return [...state];
  }
};

export default productRatings;