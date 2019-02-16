import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getPopularMovies,
  searchMovies,
  clearMovies,
  showLoadingSpinner,
  loadMoreMovies
} from '../actions/index';
import Home from '../components/Home/Home';
import { API_URL, API_KEY } from '../config';

class HomeContainer extends Component {
  componentDidMount() {
    this.getMovies();
  }
  
  componentDidUpdate() {
    // console.log('searchterm ', this.props.home.movies)
  }
  
  getMovies = () => {
    const popularEP = this.generateEndpoint("movie/popular")(false)("");
    console.log(popularEP);
    this.props.showLoadingSpinner();
    this.props.getPopularMovies(popularEP);
  }

  searchMovies = (loadMore, searchTerm) => {
    const searchEP = this.generateEndpoint("search/movie")(loadMore)(searchTerm);

    this.props.clearMovies();
    this.props.showLoadingSpinner();
    this.props.searchMovies(searchEP, searchTerm)
  }

  loadMoreMovies = (loadMore) => {
    const {searchTerm } = this.props.home;
    const loadMoreEP = 
      !searchTerm 
      ? this.generateEndpoint("movie/popular")(true)("")
      : this.generateEndpoint("search/movie")(loadMore)(searchTerm)

    this.props.showLoadingSpinner();
    this.props.loadMoreMovies(loadMoreEP);
  }

  // Get endpoint url
  generateEndpoint = type => loadMore => searchTerm => {
    return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${loadMore
      && this.props.home.currentPage + 1}&query=${searchTerm}`;
  }

  render() {
    return (
      <Home 
        {...this.props.home }
        searchMovies={this.searchMovies}
        loadMoreMovies={this.loadMoreMovies}
      />
    )
  }
}

const mapStateToProps = state => ({
  home: state.home
})

// We can write it like so, but note this change --> 
// <Home {...this.props} etc />  
// in our render --> return 
//
// const mapStateToProps = state => {
//   return state.home
// }

const mapDispatchToProps = {
  getPopularMovies,
  showLoadingSpinner,
  searchMovies,
  clearMovies,
  loadMoreMovies
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
