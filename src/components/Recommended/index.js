import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

function Recommended({ data, recommendedMaxIndex, url, setRecommendedMaxIndex }) {
  const [six, setSix] = useState([]);

  function getRandomSixNumbers(n) {
    const MIN_ARRAY_LENGTH = 6;
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
    if (six.length !== 6) {
      const dataLength = data.length;
      const SixSelected = getRandomSixNumbers(dataLength);
      setSix(SixSelected);
    }
  }, [data, six]);

  if (recommendedMaxIndex > 6) {
    recommendedMaxIndex = 2;
  }
  const slicedItems = six.slice(recommendedMaxIndex - 2, recommendedMaxIndex);

  return (
    <div className={ styles.recommendedContainer }>
      {slicedItems.map((recipeIndex, index) => (
        <div className={ styles.recommendItem } data-testid={ `${index}-recommendation-card` } key={ index }>
          <img src={ url.includes('meals') ? data[recipeIndex].strDrinkThumb : data[recipeIndex].strMealThumb } alt={ data[recipeIndex].strInstructions } />
          <div>
            <h2 data-testid={ `${recipeIndex}-recommendation-title` }>
              {url.includes('meals') ? data[recipeIndex].strDrink : data[recipeIndex].strMeal}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recommended;
