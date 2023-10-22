import React, { useContext } from 'react';
import RecipesContext from '../../context';
import styles from './index.module.css';

function RecipeCard({ info }) {
  const { title } = useContext(RecipesContext);

  return (
    <div className={ styles.cardContainer }>
      <div className={ styles.card }>
        <h1>{title === 'Meals' ? info.strMeal : info.strDrink}</h1>
        <img src={ title === 'Meals' ? info.strMealThumb : info.strDrinkThumb } />
      </div>
    </div>
  );
}

export default RecipeCard;
