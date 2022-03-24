import React from 'react';

import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

import './App.css';

const HatsPage = () => (
  <div>
    <h1>HAT</h1>
  </div>
);

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/hats" element={<HatsPage/>} />
      </Routes>
    </div>
  );
}

export default App;
