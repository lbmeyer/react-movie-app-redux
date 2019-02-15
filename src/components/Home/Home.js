import React, { Component } from 'react';
import axios from 'axios';
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
    if (localStorage.getItem('MoviesDB')) {
      this.setState({ loading: true });
      const state = JSON.parse(localStorage.getItem('MoviesDB'));
      setTimeout(() => {
        this.setState({
          movies: state.movies,
          heroImage: state.heroImage,
          loading: false,
          currentPage: state.currentPage,
          totalPages: state.totalPages
        });
      }, 100);
    } else {
      this.setState({ loading: true });
      this.fetchItems(this.popularEP(false)(""));
    }
  }

  curriedEndpoint = type => loadMore => searchTerm => {
    return `${API_URL}${type}?api_key=${API_KEY}&language=en-US&page=${loadMore 
      && this.state.currentPage + 1}&query=${searchTerm}`;
  }

  popularEP = this.curriedEndpoint("movie/popular");
  searchEP = this.curriedEndpoint("search/movie");

  updateItems = (loadMore, searchTerm) => {
    this.setState({
      movies: loadMore ? [...this.state.movies] : [], // if not loadMore we are searching --> []
      loading: true,
      searchTerm: loadMore ? this.state.searchTerm : searchTerm, // if loadMore is false, we are in search mode
    }, () => {
      this.fetchItems(
        !this.state.searchTerm 
        ? this.popularEP(loadMore)("")
        : this.searchEP(loadMore)(this.state.searchTerm)
      )
    })
  }

  fetchItems = async endpoint => {
    const { movies, heroImage, searchTerm } = this.state;
    
    try {
      let results = await axios.get(endpoint);

      this.setState({
        movies: [...movies, ...results.data.results],
        heroImage: heroImage || results.data.results[0], // if this.state.heroImage is null, use result.result[0]
        loading: false,
        currentPage: results.data.page,
        totalPages: results.data.total_pages
      }, () => {
          if (searchTerm === '')
            localStorage.setItem('MoviesDB', JSON.stringify(this.state));
      })
    }
    catch (e) {
      console.log("There was an error: ", e)
    }
  };

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
        {heroImage && !searchTerm  ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                heroImage.backdrop_path
              }`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
              <SearchBar callback={this.updateItems} />
          </div>
        ) : null}
        {searchTerm && <SearchBar callback={this.updateItems} />}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={loading}
          >
            {movies.map((el, i) => {
              return (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={
                    el.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${el.poster_path}`
                      : `./images/no_image.jpg`
                  }
                  movieId={el.id}
                  movieName={el.original_title}
                />
              );
            })}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage < totalPages && !loading ? (
            <LoadMoreBtn text="Load More" onClick={this.updateItems} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
