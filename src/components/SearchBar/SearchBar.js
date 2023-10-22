import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './index.module.css';

import {
  filterByFirstLetter,
  filterByIngredient,
  filterByName,
} from '../../service/MealsAPI';
import {
  filterDrinkByFirstLetter,
  filterDrinkByIngredient,
  filterDrinkByName } from '../../service/DrinksAPI';
import RecipesContext from '../../context';

function SearchBar() {
  const {
    currentTitle: title,
    setData,
  } = useContext(RecipesContext);

  const navigate = useNavigate();

  const [radioBtn, setRadioBtn] = useState('');
  const [mealOrDrinksData, setMealOrDrinksData] = useState([]);
  const [input, setInput] = useState('');

  const redirect = (data) => {
    if (data[title === 'Meals'
      ? 'meals'
      : 'drinks'] && data[title === 'Meals'
      ? 'meals'
      : 'drinks'].length === 1) {
      navigate(title === 'Meals'
        ? `/meals/${data.meals[0].idMeal}`
        : `/drinks/${data.drinks[0].idDrink}`);
    }
  };

  async function handleClick() {
    if (radioBtn === 'ingredient') {
      const data = title === 'Meals'
        ? await filterByIngredient(input)
        : await filterDrinkByIngredient(input);
      setMealOrDrinksData(data);
      redirect(data);
    } else if (radioBtn === 'name') {
      const data = title === 'Meals'
        ? await filterByName(input)
        : await filterDrinkByName(input);
      setMealOrDrinksData(data);
      redirect(data);
    } else if (radioBtn === 'firstLetter') {
      if (input.length === 1) {
        const data = title === 'Meals'
          ? await filterByFirstLetter(input)
          : await filterDrinkByFirstLetter(input);
        setMealOrDrinksData(data);
        redirect(data);
      } else if (input.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    console.log(mealOrDrinksData);
    setData(mealOrDrinksData);
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

  return (
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
  );
}

export default SearchBar;
