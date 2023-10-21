import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from '../context';

export default function Provider({ children }) {
  const [currentTitle, setCurrentTitle] = useState('Meals');

  const contextValue = {
    currentTitle,
    setCurrentTitle,
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
