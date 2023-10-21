import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './index.module.css';
import RecipesAppTitle from '../../images/logo text Recipes app.png';
import RecipesAppIcon from '../../images/ícone Recipes app.png';
import searchIcon from '../../images/searchIcon.png';
import profileIcon from '../../images/profileIcon.png';
import DrinkIcon from '../../images/icone-drink.png';
import PlateIcon from '../../images/icone-prato.png';
import {
  filterByFirstLetter,
  filterByIngredient,
  filterByName,
} from '../../service/MealsAPI';
import {
  filterDrinkByFirstLetter,
  filterDrinkByIngredient,
  filterDrinkByName } from '../../service/DrinksAPI';

function Header({ showTopBtn = true, title = 'Meals' }) {
  const [searchInputDisabled, setSearchInputDisabled] = useState(true);
  const [radioBtn, setRadioBtn] = useState('');
  const [input, setInput] = useState('');
  const [mealOrDrinksData, setMealOrDrinksData] = useState([]);

  function showDrinkOrPlate() {
    if (title.toLowerCase() === 'meals') {
      return (
        <img src={ PlateIcon } alt="Plate" className={ styles.drinkOrPlateIcon } />
      );
    } if (title.toLowerCase() === 'drinks') {
      return (
        <img src={ DrinkIcon } alt="Drink" className={ styles.drinkOrPlateIcon } />
      );
    }
  }

  function renderRadioContainer() {
    return (
      <div className={ styles.radioContainer }>
        <label htmlFor="ingredient">
          Ingredient
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            name="radioBtn"
            onChange={ (e) => setRadioBtn(e.target.value) }
          />
        </label>

        <label htmlFor="name">
          Name
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            value="name"
            name="radioBtn"
            onChange={ (e) => setRadioBtn(e.target.value) }
          />
        </label>

        <label htmlFor="firstLetter">
          First Letter
          <input
            type="radio"
            id="firstLetter"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            name="radioBtn"
            onChange={ (e) => setRadioBtn(e.target.value) }
          />
        </label>
      </div>
    );
  }

  async function handleClick() {
    if (radioBtn === 'ingredient') {
      const data = title === 'Meals'
        ? await filterByIngredient(input)
        : await filterDrinkByIngredient(input);
      setMealOrDrinksData(data);
    } else if (radioBtn === 'name') {
      const data = title === 'Meals'
        ? await filterByName(input)
        : await filterDrinkByName(input);
      setMealOrDrinksData(data);
    } else if (radioBtn === 'firstLetter') {
      if (input.length === 1) {
        const data = title === 'Meals'
          ? await filterByFirstLetter(input)
          : await filterDrinkByFirstLetter(input);
        setMealOrDrinksData(data);
      } else if (input.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    console.log(mealOrDrinksData);
  }

  return (
    <div className={ styles.HeaderContainer }>
      <div className={ styles.nav }>
        <div className={ styles.appTitle }>
          <img
            src={ RecipesAppIcon }
            alt="Recipes App"
            className={ styles.RecipesIcon }
          />
          <img
            src={ RecipesAppTitle }
            alt="Recipes App Title"
            className={ styles.RecipesTitle }
          />
        </div>
        <div className={ styles.icons }>
          {
            showTopBtn && (
              <button
                type="button"
                onClick={ () => setSearchInputDisabled(!searchInputDisabled) }
              >
                <img
                  src={ searchIcon }
                  alt="searchIcon"
                  className={ styles.searchIcon }
                  data-testid="search-top-btn"

                />
              </button>
            )
          }
          <Link to="/profile">
            <img
              src={ `${profileIcon}profileIcon` } // passing tests
              alt="Profile"
              className={ styles.profileIcon }
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
      </div>
      <div className={ styles.titleContainer }>
        {showDrinkOrPlate()}
        <h1 className={ styles.title } data-testid="page-title">{title}</h1>
      </div>
      {
        searchInputDisabled ? '' : (
          <div className={ styles.searchInputContainer }>
            <div className={ styles.formContainer }>
              <input
                type="text"
                placeholder="Search"
                data-testid="search-input"
                className="form-control"
                value={ input }
                onChange={ (e) => setInput(e.target.value) }
              />
              <div className={ styles.formButtons }>
                {renderRadioContainer()}
                <button
                  type="button"
                  className={ `${styles.searchBtn} btn btn-warning` }
                  data-testid="exec-search-btn"
                  onClick={ handleClick }
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default Header;

Header.propTypes = {
  showTopBtn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
