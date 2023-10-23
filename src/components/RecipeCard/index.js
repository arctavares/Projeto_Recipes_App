import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../context';
import styles from './index.module.css';

function RecipeCard({ info }) {
  const { title } = useContext(RecipesContext);

  return (
    <div className={ styles.cardContainer }>
      <div className={ styles.card }>
        <h1>{title === 'Meals' ? info.strMeal : info.strDrink}</h1>
        <img
          src={ title === 'Meals' ? info.strMealThumb : info.strDrinkThumb }
          alt={ title === 'Meals' ? info.strMeal : info.strDrink }
        />
      </div>
    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  info: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};
