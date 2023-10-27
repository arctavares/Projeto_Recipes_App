import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMealById } from '../../service/MealsAPI';
import { getDrinkById } from '../../service/DrinksAPI';
import YouTubeEmbed from '../../YoutubeEmbeded';
import styles from './index.module.css';

function RecipeDetail() {
  const [info, setInfo] = useState({});

  const param = useParams();
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    async function fetchMealData() {
      const data = await getMealById(param.id);
      setInfo(data);
    }

    async function fetchDrinkData() {
      const data = await getDrinkById(param.id);
      setInfo(data);
    }

    if (url.includes('meals')) {
      fetchMealData();
    } else if (url.includes('drinks')) {
      fetchDrinkData();
    }
  }, []);

  function showYoutubeVideo() {
    if (url.includes('meals') && info.strYoutube !== '' && info.strYoutube) {
      const URL_CODE = info.strYoutube && info.strYoutube.split('=')[1];
      return (
        <div className={ styles.videoContainer }>
          <YouTubeEmbed videoID={ URL_CODE } />
        </div>
      );
    }
  }

  return (
    <div className={ styles.recipeDetailContainer }>
      <div className={ styles.imgContainer }>
        <img
          src={ url.includes('drinks') ? info.strDrinkThumb : info.strMealThumb }
          alt={ url.includes('drinks') ? info.strDrinkThumb : info.strMealThumb }
        />
        <div
          className={ styles.centered }
        >
          {url.includes('drinks') ? info.strDrink : info.strMeal}
        </div>
      </div>
      <div className={ styles.ingredientsContainer }>
        <h1>Ingredients</h1>
        <div className={ styles.ingredientsList }>
          {
            Object.keys(info).map((ingredient) => {
              if (ingredient
                .includes('Ingredient')
                && (info[ingredient] !== ''
                && info[ingredient] !== null)) {
                return <li key={ ingredient }>{info[ingredient]}</li>;
              }
              return null;
            })
          }
        </div>
      </div>
      <div className={ styles.instructionsContainer }>
        <h1>Instructions</h1>
        <div className={ styles.instructionsText }>
          <p>{info.strInstructions}</p>
        </div>
      </div>
      {
        showYoutubeVideo()
      }

    </div>
  );
}

export default RecipeDetail;
