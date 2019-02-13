import React, { Component } from 'react';
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ''
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    this.fetchItems(endpoint);
  }

  fetchItems = endpoint => {
    fetch(endpoint)
      .then(endpoint)
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0], // if this.state.heroImage is null, use result.result[0]
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        });
      });
  };

  loadMoreItems = () => {
    const { searchTerm, currentPage } = this.state;
    let endpoint = '';
    this.setState({ loading: true });

    // if not searching for a movie, api get the next page of movies
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    this.fetchItems(endpoint);
  };

  searchItems = searchTerm => {
    console.log(searchTerm)
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (!searchTerm) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  render() {
    const {
      movies,
      heroImage,
      loading,
      currentPage,
      totalPages,
      searchTerm
    } = this.state;

    return (
      <div className="rmdb-home">
        {this.state.heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.original_title}
              text={heroImage.overview}
            /> 
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null }
        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={this.state.loading}
          >
            {this.state.movies.map((el, i) => {
              return (
                <MovieThumb 
                  key={i} 
                  clickable={true} 
                  image={el.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${el.poster_path}` : `./images/no_image.jpg`} 
                  movieId={el.id}
                  movieName={el.original_title}
                />
              )
            })}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : null}
          {(this.state.currentPage < this.state.totalPages && !this.state.load) ?
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
            : null }
        </div>
      </div>
    );
  }
}

export default Home;
