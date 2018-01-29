import {
  RESET_SCORE,
  INCREMENT_SCORE
} from '../actions/types';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_SCORE:
      return initialState
    case INCREMENT_SCORE:
      return state + action.payload
    default:
      return state
  }
}
