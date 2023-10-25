import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context';
import RecipeCard from '../RecipeCard';
import styles from './index.module.css';
import Categories from '../Categories';

function Recipes() {
  const {
    data,
    currentTitle,
    startMealsData,
    startDrinksData,
  } = useContext(RecipesContext);
  const MAX_CARDS = 12;
  const [startWith, setStartWith] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let newData;
      if (currentTitle === 'Meals') {
        newData = await startMealsData();
      } else {
        newData = await startDrinksData();
      }
      setStartWith(newData);
    }

    fetchData();
  }, [startWith]);

  return (
    <>
      <Categories />
      <div className={ styles.recipesContainer }>
        {((data && data.length > 0) ? data : startWith)
          .splice(0, MAX_CARDS)
          .map((card, index) => (
            <RecipeCard
              info={ card }
              index={ index }
              key={ card[currentTitle === 'Meals' ? 'idMeal' : 'idDrink'] }
            />
          ))}
      </div>
    </>
  );
}

export default Recipes;
