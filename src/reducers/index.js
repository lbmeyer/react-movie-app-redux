import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import movieReducer from './movieReducer';

export default combineReducers({
  home: homeReducer,
  movie: movieReducer
})