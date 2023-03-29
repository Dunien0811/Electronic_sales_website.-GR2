import * as Types from './../../constants/ActionType';
let initialState = [];
let index = -1;

const findIndexs = (id, state) => {
    index = state.findIndex(e => e.id === id)
    return index;
}
const favorites = (state = initialState, action) => {
  switch (action.type) {
    case Types.FETCH_FAVORITES:
      state = action.favorites;
      return [...state];
    case Types.ADD_FAVORITE:
      state.push(action.favorite);
      return [...state];
    case Types.REMOVE_FAVORITE:
      index = findIndexs(action.id, state);
      state.splice(index, 1);
      return [...state];
    default: return [...state];
  }
};

export default favorites;