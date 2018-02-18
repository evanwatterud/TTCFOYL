import {
  RESET_LIVES,
  DECREMENT_LIVES
} from '../actions/types';

const initialState = 3;

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_LIVES:
      return initialState
    case DECREMENT_LIVES:
      return state - action.payload
    default:
      return state
  }
}
