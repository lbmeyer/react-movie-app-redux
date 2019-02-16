import axios from 'axios';
import { GET_POPULAR_MOVIES, GET_ERRORS, SEARCH_MOVIES, LOAD_MORE_MOVIES, CLEAR_MOVIES, SHOW_LOADING_SPINNER } from './types';

// action creates for Home
export const getPopularMovies = endpoint => async dispatch => {
  try {
    let results = await axios.get(endpoint);
    dispatch({
      type: GET_POPULAR_MOVIES,
      payload: results
    })
  } catch (error) {
    dispatch({ 
      type: 'GET_ERRORS',
      payload: error
    })
  }
};

export const searchMovies = (endpoint, searchTerm) => async dispatch => {
  // searchEP = curriedEndpoint("search/movie")(loadMore)(searchTerm);

  try {
    let results = await axios.get(endpoint);

    dispatch({
      type:SEARCH_MOVIES,
      payload: {...results, searchTerm}
    })
  } catch ( error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error
    })
  }
}

export const loadMoreMovies = (endpoint) => async dispatch => {
  try {
    let results = await axios.get(endpoint);

    dispatch({
      type: LOAD_MORE_MOVIES,
      payload: results
    })
  } catch (error) {
    dispatch({
      type: 'GET_ERRORS',
      payload: error
    });
  }
}

export const clearMovies = () => {
  return {
    type: CLEAR_MOVIES,
    payload: null
  }
}

export const showLoadingSpinner = () => {
  return {
    type: SHOW_LOADING_SPINNER,
    payload: null
  }
} 