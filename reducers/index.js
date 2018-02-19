import { combineReducers } from 'redux';
import score from './scoreReducer';
import lives from './livesReducer';
import circles from './circlesReducer';

export default reducers = combineReducers({
  score,
  lives,
  circles
});
