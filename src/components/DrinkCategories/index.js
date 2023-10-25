import styles from './index.module.css';
import All from '../../images/AllDrinks.png';
import cocktail from '../../images/cocktail.png';
import cocoa from '../../images/cocoa.png';
import drink from '../../images/drink.png';
import other from '../../images/other.png';
import shake from '../../images/shake.png';

function DrinkCategories() {
  function handleClick() {

  }

  return (
    <div className={ styles.categoryFilters }>
      <button type="button" onClick={ handleClick } data-testid="All-category-filter">
        <img src={ All } alt="All" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Ordinary Drink-category-filter"
      >
        <img src={ drink } alt="Ordinary Drink" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Cocktail-category-filter"
      >
        <img src={ cocktail } alt="Cocktail" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Shake-category-filter"
      >
        <img src={ shake } alt="Shake" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Other/Unknown-category-filter"
      >
        <img src={ other } alt="Other" />
      </button>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="Cocoa-category-filter"
      >
        <img src={ cocoa } alt="Cocoa" />
      </button>
    </div>
  );
}

export default DrinkCategories;
