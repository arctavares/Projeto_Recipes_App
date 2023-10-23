import React, { useContext } from 'react';
import RecipesContext from '../../context';
import RecipeCard from '../RecipeCard';
import styles from './index.module.css';

function Recipes() {
  const { data, currentTitle } = useContext(RecipesContext);
  const MAX_CARDS = 12;

  return (
    <div className={ styles.recipesContainer }>
      {data
        && data
          .splice(1, MAX_CARDS)
          .map((card) => (
            <RecipeCard
              info={ card }
              key={ card[currentTitle === 'Meals' ? 'idMeal' : 'idDrink'] }
            />
          ))}
    </div>
  );
}

export default Recipes;
