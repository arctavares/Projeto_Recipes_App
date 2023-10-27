import { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import All from '../../images/AllMeals.png';
import beef from '../../images/beef.png';
import goat from '../../images/goat.png';
import chicken from '../../images/chicken.png';
import breakFast from '../../images/breakfast.png';
import Dessert from '../../images/dessert.png';
import RecipesContext from '../../context';
import { filterByCategory } from '../../service/MealsAPI';

function MealCategories() {
  const { setData, startMealsData } = useContext(RecipesContext);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    async function fetchData() {
      const response = await filterByCategory(category);
      setData(response);
    }
    async function fetchAll() {
      const response = await startMealsData();
      setData(response);
    }
    if (category !== 'All') {
      fetchData();
    } else if (category === 'All') {
      fetchAll();
    }
  }, [category]);

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
        onClick={ () => setCategory(category === 'Beef' ? 'All' : 'Beef') }
        data-testid="Beef-category-filter"
      >
        <img src={ beef } alt="Beef" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(category === 'Goat' ? 'All' : 'Goat') }
        data-testid="Goat-category-filter"
      >
        <img src={ goat } alt="Goat" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(category === 'Chicken' ? 'All' : 'Chicken') }
        data-testid="Chicken-category-filter"
      >
        <img src={ chicken } alt="Chicken" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(category === 'Breakfast' ? 'All' : 'Breakfast') }
        data-testid="Breakfast-category-filter"
      >
        <img src={ breakFast } alt="BreakFast" />
      </button>
      <button
        type="button"
        onClick={ () => setCategory(category === 'Dessert' ? 'All' : 'Dessert') }
        data-testid="Dessert-category-filter"
      >
        <img src={ Dessert } alt="Dessert" />
      </button>
    </div>
  );
}

export default MealCategories;
