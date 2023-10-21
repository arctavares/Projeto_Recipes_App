import React from 'react';
import propTypes from 'prop-types';
import RecipesContext from '../context';

export default function Provider({ children }) {
  const contextValue = {
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
