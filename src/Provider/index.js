import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from '../context';
import { filterByName } from '../service/MealsAPI';
import { filterDrinkByName } from '../service/DrinksAPI';

export default function Provider({ children }) {
  const [currentTitle, setCurrentTitle] = useState('Meals');
  const [data, setData] = useState([]);
  const startMealsData = () => filterByName('');
  const startDrinksData = () => filterDrinkByName('');

  const contextValue = {
    currentTitle,
    setCurrentTitle,
    data,
    setData,
    startMealsData,
    startDrinksData,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node,
}.isRequired;
