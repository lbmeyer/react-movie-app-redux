import {
  SHOW_LOADING_SPINNER,
  CLEAR_LOADING_SPINNER,
  CLEAR_MOVIES,
  SEARCH_MOVIES,
  GET_POPULAR_MOVIES,
  LOAD_MORE_MOVIES,
  SET_POPULAR_PERSISTED_STATE
} from '../actions/types.js';

const initializeState = {
  movies: [],
  heroImage: null,
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerm: 'test'
}

export default function(state = initializeState, action) {
  switch (action.type) {
    case GET_POPULAR_MOVIES:
      return {
        ...state,
        movies: action.payload.data.results,
        heroImage: state.heroImage || action.payload.data.results[0],
        loading: false,
        currentPage: action.payload.data.page,
        totalPages: action.payload.data.total_pages,
        searchTerm: ''
      }
    case LOAD_MORE_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...action.payload.data.results],
        loading: false,
        currentPage: action.payload.data.page,
        totalPages: action.payload.data.total_pages
      }
    case SEARCH_MOVIES: 
      return {
        ...state,
        movies: action.payload.data.results,
        loading: false,
        currentPage: action.payload.data.page,
        totalPages: action.payload.data.total_pages,
        searchTerm: action.payload.searchTerm
      }
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: []
      }
    case SHOW_LOADING_SPINNER:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}