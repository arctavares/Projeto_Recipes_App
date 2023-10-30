import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function Recommended({ data, recommendedMaxIndex, url, oppositeData }) {
  const [six, setSix] = useState([]);

  function getRandomSixNumbers(n) {
    const MIN_ARRAY_LENGTH = 6;
    console.log(n);
    if (n < MIN_ARRAY_LENGTH) {
      throw new Error('The array length must be at least 6.');
    }

    const randomNumbers = [];
    while (randomNumbers.length < MIN_ARRAY_LENGTH) {
      const index = Math.floor(Math.random() * n);
      if (!randomNumbers.includes(index)) {
        randomNumbers.push(index);
      }
    }

    return randomNumbers;
  }

  useEffect(() => {
    const EXACT_NUMBER_OF_SIX = 6;
    if (six.length !== EXACT_NUMBER_OF_SIX) {
      const dataLength = oppositeData.length;
      const SixSelected = getRandomSixNumbers(dataLength);
      setSix(SixSelected);
    }
  }, [data, six]);

  const slicedItems = six.slice(recommendedMaxIndex - 2, recommendedMaxIndex);
  console.log(slicedItems);
  console.log(six);
  return (
    <div className={ styles.recommendedContainer }>
      {slicedItems.map((recipeIndex, index) => (
        <div
          className={ styles.recommendItem }
          data-testid={ `${index}-recommendation-card` }
          key={ index }
        >
          <img
            src={ url.includes('meals')
              ? data[recipeIndex].strDrinkThumb
              : oppositeData[recipeIndex].strMealThumb }
            alt={ url.includes('meals')
              ? data[recipeIndex].strDrink
              : oppositeData[recipeIndex].strMeal }
          />
          <div>
            <h2 data-testid={ `${recipeIndex}-recommendation-title` }>
              {url.includes('meals')
                ? data[recipeIndex].strDrink
                : oppositeData[recipeIndex].strMeal}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recommended;

Recommended.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      strDrinkThumb: PropTypes.string,
      strMealThumb: PropTypes.string,
      strDrink: PropTypes.string,
      strMeal: PropTypes.string,
      strInstructions: PropTypes.string,
    }),
  ).isRequired,
  recommendedMaxIndex: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  oppositeData: PropTypes.arrayOf(
    PropTypes.shape({
      strMealThumb: PropTypes.string.isRequired,
      strMeal: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
