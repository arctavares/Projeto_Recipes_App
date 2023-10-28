import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMealById } from '../../service/MealsAPI';
import { filterDrinkByName, getDrinkById } from '../../service/DrinksAPI';
import YouTubeEmbed from '../../YoutubeEmbeded';
import styles from './index.module.css';
import Recommended from '../../components/Recommended';

function RecipeDetail() {
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [numberOfRecommendedClicks, setNumberOfRecommendedClicks] = useState(1);

  const param = useParams();
  const location = useLocation();
  const url = location.pathname;

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

  const MAX_NUMBER_OF_CLICKS = 3;
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
        <h2 data-testid="recipe-category">
          {url.includes('drinks') ? info.strAlcoholic : info.strCategory}
        </h2>
      </div>
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
                {info[ingredient]}
                {' '}
                -
                {' '}
                {info[`strMeasure${index + 1}`]}
              </li>
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

      <div>
        <h1 className={ styles.recommendedTitle }>Recommended</h1>
        {data.length !== 0
        && <Recommended
          data={ data }
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
      <div className={ styles.startContainer }>
        <div
          className={ styles.startRecipesContainer }
          data-testid="start-recipe-btn"
        >
          <h1>START RECIPE</h1>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
