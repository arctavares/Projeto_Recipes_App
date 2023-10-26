import React, { useContext, useEffect } from 'react';
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

  useEffect(() => {
    async function fetchData() {
      let newData;
      if (currentTitle === 'Meals') {
        newData = await startMealsData();
      } else {
        newData = await startDrinksData();
      }
      setData(newData);
    }

    if (
      data.length === 0
    ) {
      fetchData();
    }
  }, [data]);

  return (
    <>
      {currentTitle === 'Meals' ? <MealCategories /> : <DrinkCategories />}
      <div className={ styles.recipesContainer }>
        {
          (data.length !== 0 && data[0] !== undefined)
  && data.slice(0, MAX_CARDS).map((card, index) => (
    <RecipeCard
      info={ card }
      index={ index }
      key={ card[currentTitle === 'Meals' ? 'idMeal' : 'idDrink'] }
    />
  ))
        }
      </div>
    </>
  );
}

export default Recipes;
