import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../Home/Home';
import Header from '../elements/Header/Header';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import NotFound from '../elements/NotFound/NotFound';
import Movie from '../Movie/Movie';


const App = () => {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/:movieId" exact component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  )
}

export default App
