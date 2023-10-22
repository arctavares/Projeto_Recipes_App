import React, { useContext } from 'react';
import RecipesContext from '../../context';
import RecipeCard from '../RecipeCard';
import styles from './index.module.css';

function Recipes() {
  const { data, title } = useContext(RecipesContext);

  return (
    <div className={ styles.recipesContainer }>
      {
        data[title === 'Meals' ? 'meals' : 'drinks'] && data[title === 'Meals' ? 'meals' : 'drinks'].splice(1, 12).map((card) => <RecipeCard info={ card } />)
      }
    </div>
  );
}

export default Recipes;
