import React, { Component } from 'react';
import { connect } from 'react-redux';
import Movie from '../components/Movie/Movie';
import { API_URL, API_KEY } from '../config';
import { getMovie, clearMovie, showLoadingSpinner } from '../actions/index';

class MovieContainer extends Component {
  componentDidMount() {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;
    this.getMovie(movieId);
    // console.log(this.props.movie);
  }

  getMovie = movieId => {
    const movieEndpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    this.props.clearMovie();
    this.props.showLoadingSpinner();
    this.props.getMovie(movieEndpoint, creditsEndpoint);
  }

  render() {
    return (
      <Movie 
        movie={this.props.movie}
        directors={this.props.directors}
        actors={this.props.actors}
        loading={this.props.loading}
      />
      // <h1>Hi</h1>
    );
  }
}

const mapStateToProps = state => {
  return state.movie;
}

const mapDispatchToProps = {
  getMovie,
  clearMovie,
  showLoadingSpinner
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieContainer);
