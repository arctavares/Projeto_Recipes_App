import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getMealById } from '../../service/MealsAPI';
import { getDrinkById } from '../../service/DrinksAPI';
import YouTubeEmbed from '../../YoutubeEmbeded';
import styles from './index.module.css';

function RecipeInProgress() {
  const [info, setInfo] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const Size = Object.keys(info)
    .filter((ingredient) => ingredient.includes('Ingredient')
    && info[ingredient] !== ''
    && info[ingredient] !== null);

  const param = useParams();
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      let newData;
      if (url.includes('meals')) {
        newData = await getMealById(param.id);
      } else if (url.includes('drinks')) {
        newData = await getDrinkById(param.id);
      }
      setInfo(newData);
    }
    fetchData();
  }, [param.id, url]);

  useEffect(() => {
    const savedIngredients = JSON.parse(localStorage.getItem('checkedIngredients')) || {};
    setCheckedIngredients(savedIngredients);
    setAllChecked(
      Object.keys(savedIngredients).length === Size.length
        && Object.values(savedIngredients).every((ingredient) => ingredient.length),
    );
  }, [Size.length]);

  useEffect(() => {
    localStorage.setItem('checkedIngredients', JSON.stringify(checkedIngredients));
  }, [checkedIngredients]);

  function showYoutubeVideo() {
    if (url.includes('meals') && info.strYoutube !== '' && info.strYoutube) {
      const URL_CODE = info.strYoutube && info.strYoutube.split('=')[1];
      return (
        <div className={ styles.videoContainer }>
          <YouTubeEmbed videoID={ URL_CODE } />
        </div>
      );
    }
    return null;
  }

  function handleCheckboxClick(index) {
    const mealName = info.strMeal;
    const updatedIngredients = { ...checkedIngredients };

    if (!updatedIngredients[mealName]) {
      updatedIngredients[mealName] = [];
    }

    const ingredientIndex = updatedIngredients[mealName].indexOf(index);

    const INDEX_ERROR = -1;
    if (ingredientIndex !== INDEX_ERROR) {
      updatedIngredients[mealName].splice(ingredientIndex, 1);
    } else {
      updatedIngredients[mealName].push(index);
    }

    setCheckedIngredients(updatedIngredients);
    setAllChecked(
      updatedIngredients[mealName].length === Size.length,
    );
  }

  function isRecipeAlreadyAdded(storedArray, newItem) {
    return storedArray.some((item) => item?.idMeal === newItem?.idMeal);
  }

  function addToLocalStorage(key, item) {
    const storedData = JSON.parse(localStorage.getItem(key)) || { doneRecipes: [] };
    console.log('Stored Data Before:', storedData);

    if (item
      && storedData.doneRecipes
      && !isRecipeAlreadyAdded(storedData.doneRecipes, item)) {
      storedData.doneRecipes.push(item);
      localStorage.setItem(key, JSON.stringify(storedData));
    }

    console.log('Stored Data After:', storedData);
  }

  function handleAddToLocalStorage() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const mealOrDrink = url.includes('meals') ? 'meal' : 'drink';

    const updatedInfo = {
      ...info,
      doneDate: dataFormatada,
      drinkOrMeal: mealOrDrink,
    };

    addToLocalStorage('doneRecipes', updatedInfo);
    navigate('/done-recipes');
  }

  return (
    <div className={ styles.recipeDetailContainer }>
      <div className={ styles.imgContainer }>
        <img
          src={ url.includes('drinks') ? info.strDrinkThumb : info.strMealThumb }
          alt={ url.includes('drinks') ? info.strDrinkThumb : info.strMealThumb }
          data-testid="recipe-photo"
        />
        <div className={ styles.centered }>
          <h1 data-testid="recipe-title">
            {url.includes('drinks') ? info.strDrink : info.strMeal}
          </h1>
        </div>
      </div>
      <div className={ styles.category }>
        <h2 data-testid="recipe-category" className={ styles.recipeCategory }>
          {url.includes('drinks') ? info.strAlcoholic : info.strCategory}
        </h2>
      </div>
      <div className={ styles.ingredientsContainer }>
        <h1>Ingredients</h1>
        <div className={ styles.ingredientsList }>
          {Size
            .map((ingredient, index) => (
              <div className={ `${styles.checkBoxItem} form-check` } key={ ingredient }>
                <input
                  type="checkbox"
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  id={ `ingredient/${index}` }
                  name={ `ingredient/${index}` }
                  className="form-check-input"
                  onChange={ () => handleCheckboxClick(index) }
                  checked={ checkedIngredients[info.strMeal]?.includes(index) || false }
                />
                <label
                  htmlFor={ `ingredient/${index}` }
                  className={
                    `form-check-label 
                    ${checkedIngredients[info.strMeal]?.includes(index)
                && styles.checked}`
                  }
                >
                  {info[ingredient]}
                  {
                    info[`strMeasure${index + 1}`] !== null && (
                      <>
                        {' - '}
                        {info[`strMeasure${index + 1}`]}
                      </>
                    )
                  }
                </label>
              </div>
            ))}
        </div>
      </div>
      <div className={ styles.instructionsContainer }>
        <h1>Instructions</h1>
        <div className={ styles.instructionsText }>
          <p data-testid="instructions">{info.strInstructions}</p>
        </div>
      </div>
      {showYoutubeVideo()}
      {
        allChecked && (
          <div
            className={ styles.startContainer }
            onClick={ handleAddToLocalStorage }
            onKeyDown={ (e) => {
              if (e.key === 'Enter') {
                handleAddToLocalStorage();
              }
            } }
            role="button"
            tabIndex={ 0 }
            aria-label="Custom Button"
          >
            <div
              className={ styles.startRecipesContainer }
              data-testid="start-recipe-btn"
            >
              <h1>FINISH RECIPE</h1>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default RecipeInProgress;
