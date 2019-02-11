import React from 'react';
import Home from '../Home/Home';
import Header from '../elements/Header/Header';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';


const App = () => {
  return (
    <div>
      <Header />
      <HeroImage />
      <SearchBar />
      <Home />
    </div>
  )
}

export default App
