import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'; 
import Header from '../components/Header';
import Game from './Game';

const AppRouter = () => {
  return (
    <HashRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
    </HashRouter>
  );
};

export default AppRouter;

