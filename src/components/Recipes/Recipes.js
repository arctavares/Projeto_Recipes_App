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

  useEffect(() => {
    async function fetchData() {
      let newData;
      setLoading(true);
      if (currentTitle === 'Meals') {
        newData = await startMealsData();
      } else {
        newData = await startDrinksData();
      }
      setData(newData);
      setLoading(false);
    }

    if (
      data.length === 0
    ) {
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    setData(data);
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
              loading={ loading }
            />
          ))
        }
      </div>
    </>
  );
}

export default Recipes;
