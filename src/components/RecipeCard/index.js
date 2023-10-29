import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import RecipesContext from '../../context';

function RecipeCard({ info, index, loading }) {
  const { currentTitle } = useContext(RecipesContext);

  return (
    <Link
      className={ styles.link }
      to={
        currentTitle === 'Meals' ? `/meals/${info.idMeal}` : `/drinks/${info.idDrink}`
      }
    >
      <div className={ styles.cardContainer }>
        {loading ? 'loading...' : (
          <div className={ styles.card } data-testid={ `${index}-recipe-card` }>
            <img
              src={ currentTitle === 'Meals' ? info.strMealThumb : info.strDrinkThumb }
              alt={ currentTitle === 'Meals' ? info.strMeal : info.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <div className={ styles.textContainer }>
              <h1
                data-testid={ `${index}-card-name` }
              >
                {currentTitle === 'Meals' ? info.strMeal : info.strDrink}
              </h1>
            </div>

          </div>
        )}

      </div>
    </Link>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  info: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    idMeal: PropTypes.number,
    idDrink: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
