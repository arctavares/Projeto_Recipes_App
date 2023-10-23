import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import RecipesContext from '../../context';

function RecipeCard({ info, title }) {
  const { currentTitle } = useContext(RecipesContext);
  console.log(title);

  return (
    <div className={ styles.cardContainer }>
      <div className={ styles.card }>
        <h1>{currentTitle === 'Meals' ? info.strMeal : info.strDrink}</h1>
        <img
          src={ currentTitle === 'Meals' ? info.strMealThumb : info.strDrinkThumb }
          alt={ currentTitle === 'Meals' ? info.strMeal : info.strDrink }
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
  title: PropTypes.string.isRequired,
};
