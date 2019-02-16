import {
  GET_MOVIE,
  SHOW_LOADING_SPINNER,
  CLEAR_LOADING_SPINNER,
  CLEAR_MOVIE
} from '../actions/types.js';

const initializeState = {
  movie: null,
  actors: null,
  directors: [],
  loading: false
};

// Note: for GET_MOVIE, we don't need to use
// action.payload.data.movie since in our action, we already destructure
// data object into newState, which we pass here into our reducer

export default function(state = initializeState, action) {
  switch (action.type) {
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload.movie,
        actors: action.payload.actors,
        directors: action.payload.directors,
        loading: false
      };
    case SHOW_LOADING_SPINNER:
      return {
        ...state,
        loading: true
      };
    case CLEAR_MOVIE:
      return {
        ...state,
        movie: null,
        actors: null,
        directors: []
      }
    case CLEAR_LOADING_SPINNER:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
