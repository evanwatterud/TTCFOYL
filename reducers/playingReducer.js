import {
  START_PLAYING,
  STOP_PLAYING
} from '../actions/types';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case START_PLAYING:
      return !initialState
    case STOP_PLAYING:
      return initialState
    default:
      return state
  }
}
