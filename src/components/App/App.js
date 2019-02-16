import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Home from '../../containers/HomeContainer';
import Movie from '../../containers/MovieContainer';
import Header from '../elements/Header/Header';
import NotFound from '../elements/NotFound/NotFound';

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
