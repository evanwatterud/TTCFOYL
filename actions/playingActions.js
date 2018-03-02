import {
  START_PLAYING,
  STOP_PLAYING
} from './types';

export const startPlaying = () => ({
  type: START_PLAYING
})

export const stopPlaying = () => ({
  type: STOP_PLAYING
})
