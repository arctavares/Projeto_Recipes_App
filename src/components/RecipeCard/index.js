import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import RecipesContext from '../../context';

function RecipeCard({ info, index, title }) {
  const { currentTitle } = useContext(RecipesContext);
  console.log(title);

  return (
    <div className={ styles.cardContainer }>
      <div className={ styles.card } data-testid={ `${index}-recipe-card` }>
        <h1
          data-testid={ `${index}-card-name` }
        >
          {currentTitle === 'Meals' ? info.strMeal : info.strDrink}
        </h1>
        <img
          src={ currentTitle === 'Meals' ? info.strMealThumb : info.strDrinkThumb }
          alt={ currentTitle === 'Meals' ? info.strMeal : info.strDrink }
          data-testid={ `${index}-card-img` }
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
  index: PropTypes.number.isRequired,
};
