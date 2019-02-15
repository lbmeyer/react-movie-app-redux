import React, { Component } from 'react';
import axios from 'axios';
import { API_URL, API_KEY } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid.js';
import Actor from '../elements/Actor/Actor';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';

class Movie extends Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
  }

  componentDidMount() {
    // ES6 destructuring the props
    const { movieId } = this.props.match.params;

    this.setState({ loading: true })
    // First fetch the movie ...
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
  }

  fetchItems = async endpoint => {
    const { movieId } = this.props.match.params;
    let creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    try {
      let result = await axios.get(endpoint);

      // if we have status_code from API, means movie wasn't found
      if (result.data.status_code) {
        this.setState({ loading: false });
        return;
      }

      this.setState({ movie: result.data });
      let creditsResults = await axios.get(creditsEndpoint);

      // loop through results and filter directors
      const directors = creditsResults.data.crew.filter( (member) => member.job === "Director")

      this.setState({
        actors: creditsResults.data.cast,
        directors,
        loading: false
      })
    }
    catch (e) {
      console.log("There was an error ", e);
    }
  }

  render() {
    // ES6 Destructuring the props and state
    const { movieName } = this.props.location;
    const { movie, directors, actors, loading } = this.state;

    return (      
      <div className="rmdb-movie">
        {movie ?
        <div>
          <Navigation movie={movieName} />
          <MovieInfo movie={movie} directors={directors} />
          <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
        </div>
        : null }
        {actors ?
        <div className="rmdb-movie-grid">
          <FourColGrid header={'Actors'}>
            {actors.map( (element, i) => (
              <Actor key={i} actor={element} />
            ))}
          </FourColGrid>
        </div>
        : null }
        {!actors && !loading ? <h1>No movie found</h1> : null }
        {loading ? <Spinner /> : null}
      </div>
    )
  }
}

export default Movie;