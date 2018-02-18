import {
  DECREMENT_LIVES,
  RESET_LIVES
} from './types';

export const decrementLives = (livesRemoved = 1) => ({
  type: DECREMENT_LIVES,
  payload: livesRemoved
})

export const resetLives = () => ({
  type: RESET_LIVES
})
