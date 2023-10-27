import { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import All from '../../images/AllDrinks.png';
import cocktail from '../../images/cocktail.png';
import cocoa from '../../images/cocoa.png';
import drink from '../../images/drink.png';
import other from '../../images/other.png';
import shake from '../../images/shake.png';
import { filterDrinksByCategory } from '../../service/DrinksAPI';
import RecipesContext from '../../context';

function DrinkCategories() {
  const { setData, startDrinksData } = useContext(RecipesContext);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    async function fetchData() {
      const response = await filterDrinksByCategory(category);
      setData(response);
    }
    async function fetchAll() {
      const response = await startDrinksData();
      setData(response);
    }
    if (category !== 'All') {
      fetchData();
    } else if (category === 'All') {
      fetchAll();
    }
  }, [category]);

  useEffect(() => {
    async function fetchAll() {
      const response = await startDrinksData();
      setData(response);
    }
    fetchAll();
  }, []);

  return (
    <div className={ styles.categoryFilters }>
      <button
        type="button"
        onClick={ () => setCategory('All') }
        data-testid="All-category-filter"
      >
        <img src={ All } alt="All" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(
          category === 'Ordinary Drink' ? 'All' : 'Ordinary Drink',
        ) }
        data-testid="Ordinary Drink-category-filter"

      >
        <img src={ drink } alt="Ordinary Drink" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(category === 'Cocktail' ? 'All' : 'Cocktail') }
        data-testid="Cocktail-category-filter"
      >
        <img src={ cocktail } alt="Cocktail" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(category === 'Shake' ? 'All' : 'Shake') }
        data-testid="Shake-category-filter"
      >
        <img src={ shake } alt="Shake" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(
          category === 'Other / Unknown' ? 'All' : 'Other / Unknown',
        ) }
        data-testid="Other/Unknown-category-filter"
      >
        <img src={ other } alt="Other" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(category === 'Cocoa' ? 'All' : 'Cocoa') }
        data-testid="Cocoa-category-filter"
      >
        <img src={ cocoa } alt="Cocoa" />
      </button>
    </div>
  );
}

export default DrinkCategories;
