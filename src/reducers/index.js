import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import movieReducer from './movieReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  home: homeReducer,
  movie: movieReducer,
  errors: errorReducer
})