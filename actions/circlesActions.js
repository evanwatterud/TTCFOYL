import {
  RESET_CIRCLES,
  ADD_CIRCLE,
  REMOVE_CIRCLE
} from './types';

export const addCircle = (payload) => ({
  type: ADD_CIRCLE,
  payload
})

export const removeCircle = (payload) => ({
  type: REMOVE_CIRCLE,
  payload
})

export const reserCircles = () => ({
  type: RESET_CIRCLES
})
