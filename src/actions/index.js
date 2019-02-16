import axios from 'axios';
import {
  GET_POPULAR_MOVIES,
  GET_ERRORS,
  SEARCH_MOVIES,
  LOAD_MORE_MOVIES,
  CLEAR_MOVIES,
  CLEAR_MOVIE,
  SHOW_LOADING_SPINNER,
  CLEAR_LOADING_SPINNER,
  GET_MOVIE
} from './types';

// action creator for Home
export const getPopularMovies = endpoint => async dispatch => {
  try {
    let results = await axios.get(endpoint);
    console.log('popular movies ', results);
    dispatch({
      type: GET_POPULAR_MOVIES,
      payload: results
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};

export const searchMovies = (endpoint, searchTerm) => async dispatch => {
  try {
    let results = await axios.get(endpoint);

    dispatch({
      type: SEARCH_MOVIES,
      payload: { ...results, searchTerm }
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};

export const loadMoreMovies = endpoint => async dispatch => {
  try {
    let results = await axios.get(endpoint);

    dispatch({
      type: LOAD_MORE_MOVIES,
      payload: results
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};

export const clearMovies = () => {
  return {
    type: CLEAR_MOVIES,
    payload: null
  };
};

//  action creators for Movie
export const getMovie = (movieEndpoint, creditsEndpoint) => async dispatch => {
  let newState = {};

  try {
    // fetch movie data
    let result = await axios.get(movieEndpoint);
    console.log('movie result: ', result);

    newState = { movie: result.data };

    // fetch cast info
    let creditResults = await axios.get(creditsEndpoint);
    console.log('credits result: ', creditResults);

    // loop through results and filter directors
    const directors = creditResults.data.crew.filter(
      member => member.job === 'Director'
    );

    console.log(directors);

    newState = {
      ...newState,
      actors: creditResults.data.cast,
      directors
    };

    dispatch({
      type: GET_MOVIE,
      payload: newState
    });
  } catch (error) {
    dispatch(clearLoadingSpinner());
    dispatch({
      type: GET_ERRORS,
      payload: error
    });
  }
};

export const clearMovie = () => {
  return {
    type: CLEAR_MOVIE,
    payload: null
  };
};

export const showLoadingSpinner = () => {
  return {
    type: SHOW_LOADING_SPINNER,
    payload: null
  };
};

export const clearLoadingSpinner = () => {
  return {
    type: CLEAR_LOADING_SPINNER,
    payload: null
  };
};
