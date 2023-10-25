import styles from './index.module.css';
import All from '../../images/All.png';
import cocktail from '../../images/cocktail.png';
import cocoa from '../../images/cocoa.png';
import drink from '../../images/drink.png';
import other from '../../images/other.png';
import shake from '../../images/shake.png';

function Categories() {
  function handleClick() {

  }

  return (
    <div className={ styles.categoryFilters }>
      <button type="button" onClick={ handleClick }>
        <img src={ All } alt="All" />
      </button>
      <button type="button" onClick={ handleClick }>
        <img src={ drink } alt="Ordinary Drink" />
      </button>
      <button type="button" onClick={ handleClick }>
        <img src={ cocktail } alt="Cocktail" />
      </button>
      <button type="button" onClick={ handleClick }>
        <img src={ shake } alt="Shake" />
      </button>
      <button type="button" onClick={ handleClick }>
        <img src={ other } alt="Other" />
      </button>
      <button type="button" onClick={ handleClick }>
        <img src={ cocoa } alt="Cocoa" />
      </button>
    </div>
  );
}

export default Categories;
