import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import styles from './index.module.css';
import RecipesContext from '../../context';
import {
  filterByFirstLetter,
  filterByIngredient,
  filterByName,
} from '../../service/MealsAPI';
import {
  filterDrinkByFirstLetter,
  filterDrinkByIngredient,
  filterDrinkByName,
} from '../../service/DrinksAPI';

function SearchBar() {
  const { currentTitle: title, setData } = useContext(RecipesContext);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('ingredient');
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleButtonClick = useCallback(async () => {
    if (searchValue.length > 1 && searchType === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    let data;
    if (title === 'Meals') {
      if (searchType === 'ingredient') {
        data = await filterByIngredient(searchValue);
      } else if (searchType === 'name') {
        data = await filterByName(searchValue);
      } else {
        data = await filterByFirstLetter(searchValue);
      }
    } else if (searchType === 'ingredient') {
      data = await filterDrinkByIngredient(searchValue);
    } else if (searchType === 'name') {
      data = await filterDrinkByName(searchValue);
    } else {
      data = await filterDrinkByFirstLetter(searchValue);
    }

    setData(data);
    if (data.length === 1) {
      navigate(`/${title.toLowerCase()}/${data[0].id}`);
    }
  }, [searchType, searchValue, title, setData, navigate]);

  return (
    <div className={ styles.searchInputContainer }>
      <div className={ styles.formContainer }>
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          className="form-control"
          value={ searchValue }
          onChange={ handleInputChange }
        />
        <div className={ styles.radioContainer }>
          {['ingredient', 'name', 'firstLetter'].map((type) => (
            <label key={ type } htmlFor={ type }>
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <input
                type="radio"
                id={ type }
                data-testid={ `${type}-search-radio` }
                value={ type }
                name="searchType"
                onChange={ () => setSearchType(type) }
                checked={ searchType === type }
              />
            </label>
          ))}
        </div>
        <button
          type="button"
          className={ `${styles.searchBtn} btn btn-warning` }
          data-testid="exec-search-btn"
          onClick={ handleButtonClick }
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
