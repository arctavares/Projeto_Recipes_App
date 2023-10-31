import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context';
import RecipeCard from '../RecipeCard';
import styles from './index.module.css';
import DrinkCategories from '../DrinkCategories';
import MealCategories from '../MealsCategories';

function Recipes() {
  const {
    data,
    currentTitle,
    startMealsData,
    startDrinksData,
    setData,
  } = useContext(RecipesContext);
  const MAX_CARDS = 12;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      let newData;
      if (currentTitle === 'Meals') {
        newData = await startMealsData();
      } else {
        newData = await startDrinksData();
      }
      setData(newData);
    } catch (e) {
      console.error(e);
      setError('Error loading data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data.length === 0) {
      fetchData();
    }
  }, [data, currentTitle, startMealsData, startDrinksData, setData]);

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  return (
    <>
      {error && <div className={ styles.error }>{error}</div>}
      {currentTitle === 'Meals' ? <MealCategories /> : <DrinkCategories />}
      <div className={ styles.recipesContainer }>
        {data.length !== 0
          && data[0] !== undefined
          && data.slice(0, MAX_CARDS).map((card, index) => (
            <RecipeCard
              info={ card }
              index={ index }
              key={
                card[currentTitle === 'Meals' ? card.idMeal : card.idDrink]
              }
              loading={ loading }
            />
          ))}
      </div>
    </>
  );
}

export default Recipes;
