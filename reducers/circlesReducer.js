import {
  RESET_CIRCLES,
  REMOVE_CIRCLE,
  ADD_CIRCLE
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_CIRCLES:
      return initialState
    case ADD_CIRCLE:
      return [...state, action.payload]
    case REMOVE_CIRCLE:
      return state.filter((location) => (location.x != payload.x && location.y != payload.y));
    default:
      return state
  }
}
