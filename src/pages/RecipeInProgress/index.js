import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { getMealById } from '../../service/MealsAPI';
import { getDrinkById } from '../../service/DrinksAPI';
import YouTubeEmbed from '../../YoutubeEmbeded';
import styles from './index.module.css';

function RecipeInProgress() {
  const [info, setInfo] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([]);
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

  function handleCheckboxClick(e) {
    const checkboxName = e.target.name;
    const isChecked = e.target.checked;

    let newChecked;

    if (isChecked) {
      newChecked = [...checked, checkboxName];
    } else {
      newChecked = checked.filter((item) => item !== checkboxName);
    }
    setChecked(newChecked);
    if (Size.length === newChecked.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }

  function isRecipeAlreadyAdded(storedArray, newItem) {
    return storedArray.some((item) => item && item.id && newItem && newItem.id && item.id === newItem.id);
  }

  function addToLocalStorage(key, item) {
    // Obtém o objeto do localStorage
    const storedData = JSON.parse(localStorage.getItem(key)) || { doneRecipes: [] };

    // Verifica se o novo item já está presente no array
    if (!isRecipeAlreadyAdded(storedData.doneRecipes, item.doneRecipes)) {
      // Adiciona o novo item à propriedade doneRecipes do objeto
      storedData.doneRecipes.push(item.doneRecipes);

      // Salva o objeto modificado de volta no localStorage
      localStorage.setItem(key, JSON.stringify(storedData));
    }
  }

  function addToLocalStorage(key, item) {
    const storedData = JSON.parse(localStorage.getItem(key)) || { doneRecipes: [] };
    const newItem = item.doneRecipes;

    if (storedData.doneRecipes && newItem) {
      if (!isRecipeAlreadyAdded(storedData.doneRecipes, newItem)) {
        storedData.doneRecipes.push(newItem);
        localStorage.setItem(key, JSON.stringify(storedData));
      }
    }
  }

  function handleAddToLocalStorage() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const dataFormatada = `${dia}-${mes}-${ano}`;

    const updatedInfo = {
      ...info,
      doneDate: dataFormatada,
    };

    addToLocalStorage('doneRecipes', { doneRecipes: updatedInfo });
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
                  onClick={ (e) => handleCheckboxClick(e) }
                />
                <label htmlFor={ `ingredient/${index}` } className="form-check-label">
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
