import {
  RESET_CIRCLES,
  ADD_CIRCLE,
  REMOVE_CIRCLE
} from './types';

export const addCircle = (circleLocation) => ({
  type: ADD_CIRCLE,
  payload: circleLocation
})

export const removeCircle = (circleLocation) => ({
  type: REMOVE_CIRCLE,
  payload: circleLocation
})

export const reserCircles = () => ({
  type: RESET_CIRCLES
})
