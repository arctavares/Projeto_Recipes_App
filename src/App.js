import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MealsOrDrinks from './pages/MealsOrDrinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <MealsOrDrinks title="Meals" /> } />
      <Route path="/drinks" element={ <MealsOrDrinks title="Drinks" /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
