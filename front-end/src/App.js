<<<<<<< HEAD
import { Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Routes>
      <Route exact path="/checkout" element={ <Checkout /> } />
    </Routes>
=======
import React from 'react';
// import { useParams } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ContextProvider from './context/ContextProvider';
// import rockGlass from './images/rockGlass.svg';
import Login from './pages/login';

function App() {
  return (
    // <Login />
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
>>>>>>> b1237115b1b4f4721ff4ed1eee65e3b35a6a612c
  );
}

export default App;
