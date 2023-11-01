import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import RecipesContext from '../../context';

function RecipeCard({ info, index, loading, fetchData }) {
  const { currentTitle } = useContext(RecipesContext);

  useEffect(() => {
    if (!info && !info?.strInstructions) {
      console.log('works');
      fetchData();
    }
  }, [info]);

  const handleFetchData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let timeoutId;
    const TIME_OUT = 2000;

    if (loading) {
      timeoutId = setTimeout(() => {
        handleFetchData();
      }, TIME_OUT);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, fetchData]);

  return (
    <Link
      className={ styles.link }
      to={
        currentTitle === 'Meals' ? `/meals/${info.idMeal}` : `/drinks/${info.idDrink}`
      }
    >
      <div className={ styles.cardContainer }>
        {loading ? <div className={ styles.loadingContainer }><p>loading...</p></div> : (
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
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};
