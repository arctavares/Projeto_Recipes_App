import React, { useContext } from 'react';
import RecipesContext from '../../context';
import RecipeCard from '../RecipeCard';
import styles from './index.module.css';

function Recipes() {
  const { data, title } = useContext(RecipesContext);

  const MAX_CARDS = 12;

  return (
    <div className={ styles.recipesContainer }>
      {
        data[title === 'Meals' ? 'meals' : 'drinks']
        && data[title === 'Meals' ? 'meals' : 'drinks']
          .splice(1, MAX_CARDS)
          .map((card) => <RecipeCard info={ card } key={ card } />)
      }
    </div>
  );
}

export default Recipes;
