import styles from './index.module.css';
import All from '../../images/AllMeals.png';
import beef from '../../images/beef.png';
import goat from '../../images/goat.png';
import chicken from '../../images/chicken.png';
import breakFast from '../../images/breakfast.png';
import Dessert from '../../images/dessert.png';

function MealCategories() {
  function handleClick() {

  }

  return (
    <div className={ styles.categoryFilters }>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="All-category-filter"
      >
        <img src={ All } alt="All" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Beef-category-filter"
      >
        <img src={ beef } alt="Beef" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Goat-category-filter"
      >
        <img src={ goat } alt="Goat" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Chicken-category-filter"
      >
        <img src={ chicken } alt="Chicken" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="BreakFast-category-filter"
      >
        <img src={ breakFast } alt="BreakFast" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Dessert-category-filter"
      >
        <img src={ Dessert } alt="Dessert" />
      </button>
    </div>
  );
}

export default MealCategories;
