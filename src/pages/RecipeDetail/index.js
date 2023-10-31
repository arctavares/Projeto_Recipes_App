import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { filterByName, getMealById } from '../../service/MealsAPI';
import { filterDrinkByName, getDrinkById } from '../../service/DrinksAPI';
import YouTubeEmbed from '../../YoutubeEmbeded';
import styles from './index.module.css';
import Recommended from '../../components/Recommended';
import like from '../../images/like.png';
import likeEmpty from '../../images/likeEmpty.png';
import share from '../../images/Share.png';

const copy = require('clipboard-copy');

function RecipeDetail() {
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [numberOfRecommendedClicks, setNumberOfRecommendedClicks] = useState(1);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [showCopiedUrlMessage, setShowCopiedUrlMessage] = useState(false);
  const [currentLike, setCurrentLike] = useState('');
  const [oppositeData, setOppositeData] = useState([]);

  const param = useParams();
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    const doneRecipesResponse = localStorage.getItem('doneRecipes');
    if (doneRecipesResponse === null) {
      const object = {
        doneRecipes: [],
      };
      localStorage.setItem('doneRecipes', JSON.stringify(object));
    }
    const getRecipesDone = JSON.parse(doneRecipesResponse);

    getRecipesDone.doneRecipes.forEach((recipe) => {
      if (recipe?.strMeal != null
        && info?.strMeal !== null
        && recipe.strMeal === info.strMeal) {
        setDoneRecipe(true);
      }
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      let newData;
      if (url.includes('meals')) {
        newData = await getMealById(param.id);
      } else if (url.includes('drinks')) {
        newData = await getDrinkById(param.id);
      }
      setInfo(newData);
      const drinksData = await filterDrinkByName('');
      setData(drinksData);
      const mealsData = await filterByName(' ');
      setOppositeData(mealsData);
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

  function isDuplicateOrIsLiked(favorites) {
    const isLiked = favorites.some((recipe) => (recipe?.idMeal
      ? recipe.idMeal
      : recipe.idDrink) === (info?.idMeal
      ? info.idMeal
      : info.idDrink));
    return isLiked;
  }

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isLiked = isDuplicateOrIsLiked(favoriteRecipes);
    if (isLiked) {
      setCurrentLike(like);
    } else {
      setCurrentLike(likeEmpty);
    }
  }, [info]);

  function isRecipeAlreadyAdded(storedArray, newItem) {
    return storedArray.some((item) => item?.idMeal === newItem?.idMeal);
  }

  function addToLocalStorage(key, item) {
    const storedData = JSON.parse(localStorage.getItem(key)) || [];
    if (item
      && storedData
      && !isRecipeAlreadyAdded(storedData, item)) {
      storedData.push(item);
      localStorage.setItem(key, JSON.stringify(storedData));
    }
  }

  function handleAddToLocalStorage() {
    const mealOrDrink = url.includes('meals') ? 'meal' : 'drink';
    const updatedInfo = {
      ...info,
      drinkOrMeal: mealOrDrink,
    };
    addToLocalStorage('favoriteRecipes', updatedInfo);
  }

  function handleLikeClick() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const isDuplicate = isDuplicateOrIsLiked(favoriteRecipes);
    if (!isDuplicate) {
      favoriteRecipes.push(info);
      // localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      handleAddToLocalStorage();
      setCurrentLike(like);
    } else {
      global.alert('This recipe is already on the favorites');
    }
  }

  function handleShareClick() {
    const TIME_TO_HIDE_MESSAGE = 5000;
    copy(window.location.href);
    setShowCopiedUrlMessage(true);
    setTimeout(() => {
      setShowCopiedUrlMessage(false);
    }, TIME_TO_HIDE_MESSAGE);
  }

  const MAX_NUMBER_OF_CLICKS = 3;
  return (
    <div className={ styles.recipeDetailContainer }>
      <div className={ styles.imgContainer }>
        <img
          src={ url.includes('drinks') ? info.strDrinkThumb : info.strMealThumb }
          alt={ url.includes('drinks') ? info.strDrinkThumb : info.strMealThumb }
          data-testid="recipe-photo"
          className={ styles.recipeImg }
        />
        <div className={ styles.centered }>
          <h1 data-testid="recipe-title">
            { url.includes('drinks') ? info.strDrink : info.strMeal }
          </h1>
        </div>
        <div className={ styles.icons }>
          <button type="button" onClick={ handleLikeClick }>
            <img src={ currentLike } alt="like" />
          </button>
          <button type="button" onClick={ handleShareClick }>
            <img src={ share } alt="share" />
          </button>
        </div>
      </div>
      <div className={ styles.category }>
        <h2 data-testid="recipe-category">
          { url.includes('drinks') ? info.strAlcoholic : info.strCategory }
        </h2>
      </div>
      {showCopiedUrlMessage && (
        <div className={ styles.copiedMessage }>
          <p>Link Copied !!!!</p>
        </div>
      )}
      <div className={ styles.ingredientsContainer }>
        <h1>Ingredients</h1>
        <div className={ styles.ingredientsList }>
          {Object.keys(info)
            .filter((ingredient) => ingredient.includes('Ingredient')
              && info[ingredient] !== ''
              && info[ingredient] !== null)
            .map((ingredient, index) => (
              <li
                key={ ingredient }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { info[ingredient] }
                { ' ' }
                -
                { ' ' }
                { info[`strMeasure${index + 1}`] }
              </li>
            ))}
        </div>
      </div>
      <div className={ styles.instructionsContainer }>
        <h1>Instructions</h1>
        <div className={ styles.instructionsText }>
          <p data-testid="instructions">{ info.strInstructions }</p>
        </div>
      </div>
      {showYoutubeVideo()}

      <div>
        <h1 className={ styles.recommendedTitle }>Recommended</h1>
        {data.length !== 0 && oppositeData.length !== 0
          && <Recommended
            data={ data }
            oppositeData={ oppositeData }
            recommendedMaxIndex={ numberOfRecommendedClicks * 2 }
            url={ url }
          />}
        <div className={ styles.nextButtonContainer }>
          <button
            type="button"
            className={ styles.nextButton }
            onClick={ () => setNumberOfRecommendedClicks((prevClicks) => (
              prevClicks === MAX_NUMBER_OF_CLICKS
                ? 1
                : prevClicks + 1)) }
          >
            Next
          </button>
        </div>
      </div>
      {
        !doneRecipe && (
          <Link
            to={ url.includes('meals')
              ? `/meals/${param.id}/in-progress`
              : `/drinks/${param.id}/in-progress` }
            className={ styles.link }
          >
            <div className={ styles.startContainer }>
              <div
                className={ styles.startRecipesContainer }
                data-testid="start-recipe-btn"
              >
                <h1>START RECIPE</h1>
              </div>
            </div>
          </Link>
        )
      }

    </div>
  );
}

export default RecipeDetail;
