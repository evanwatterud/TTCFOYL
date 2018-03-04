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
      return [...state, { location: action.payload.location, id: action.payload.id, size: action.payload.size }]
    case REMOVE_CIRCLE:
      return state.filter((circle) => (circle.location.x != action.payload.x && circle.location.y != action.payload.y));
    default:
      return state
  }
}
