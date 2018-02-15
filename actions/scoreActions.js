import {
  INCREMENT_SCORE,
  RESET_SCORE
} from './types';

export const incrementScore = (additionalScore = 1) => ({
  type: INCREMENT_SCORE,
  payload: additionalScore
})

export const resetScore = () => ({
  type: RESET_SCORE
})
