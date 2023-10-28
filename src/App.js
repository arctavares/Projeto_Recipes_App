import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import MealsOrDrinks from './pages/MealsOrDrinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Provider from './Provider';
import RecipeDetail from './pages/RecipeDetail';

function App() {
  return (
    <Provider>
      <div className={ styles.mainDiv }>
        <div className={ styles.contentContainer }>
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/meals" element={ <MealsOrDrinks title="Meals" /> } />
            <Route path="/drinks" element={ <MealsOrDrinks title="Drinks" /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route path="/done-recipes" element={ <DoneRecipes /> } />
            <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
            <Route path="/meals/:id" element={ <RecipeDetail /> } />
            <Route path="/drinks/:id" element={ <RecipeDetail /> } />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
