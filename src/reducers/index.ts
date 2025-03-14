import { combineReducers } from 'redux';
import { canvasReducer } from './canvasReducer';

export const rootReducer = combineReducers({
  canvas: canvasReducer,
});