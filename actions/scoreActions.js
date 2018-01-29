import {
  INCREMENT_SCORE,
  RESET_SCORE
} from './types';

const incrementScore = (additionalScore = 1) => ({
  type: INCREMENT_SCORE,
  payload: additionalScore
});

const resetScore = () => ({
  type: RESET_SCORE
});

export const increment = incrementScore;
export const reset = resetScore;
