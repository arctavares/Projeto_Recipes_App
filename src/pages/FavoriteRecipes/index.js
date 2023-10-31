import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';
import AllDoneRecipe from '../../images/AllDoneRecipes.png';
import drinks from '../../images/drinks.png';
import foods from '../../images/foods.png';
import styles from './index.module.css';
import share from '../../images/Share.png';
import like from '../../images/like.png';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [localStorageUpdated, setLocalStorageUpdated] = useState(false);
  const [showCopiedUrlMessage, setShowCopiedUrlMessage] = useState(false);

  setCurrentTitle('Favorites');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(data);

    const handleStorageChange = () => {
      setLocalStorageUpdated((prevState) => !prevState);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [localStorageUpdated]);

  function returnLink(HTML, recipe) {
    return (
      <Link
        to={ `/${recipe?.strMeal
          ? 'meals'
          : 'drinks'}/${recipe?.idMeal
          ? recipe.idMeal
          : recipe.idDrink}` }
      >
        {HTML}
      </Link>
    );
  }

  function removeFromFavorites(currentRecipe) {
    const filteredRecipes = favoriteRecipes
      .filter((recipe) => (recipe?.idMeal ? recipe.idMeal : recipe.idDrink)
        !== (currentRecipe?.idMeal ? currentRecipe.idMeal : currentRecipe.idDrink));
    const filteredRecipesJSON = JSON.stringify(filteredRecipes);
    localStorage.setItem('favoriteRecipes', filteredRecipesJSON);
    setLocalStorageUpdated(!localStorageUpdated);
  }

  function shareLink(id, recipe) {
    const TIME_TO_HIDE_MESSAGE = 5000;
    copy(`localhost:3000/${recipe?.idMeal ? 'meals' : 'drinks'}/${id}`);
    setShowCopiedUrlMessage(true);
    setTimeout(() => {
      setShowCopiedUrlMessage(false);
    }, TIME_TO_HIDE_MESSAGE);
  }

  function returnCard(recipe) {
    return (

      <div className={ styles.cardContainer }>
        <div className={ styles.imgContainer }>
          {
            (recipe?.strMealThumb
              || recipe?.strDrinkThumb)
              && returnLink(
                <img
                  src={ recipe.strMealThumb
                  || recipe.strDrinkThumb }
                  alt="recipe"
                />,
                recipe,
              )
          }
        </div>
        <div>
          {((recipe?.strMeal || recipe?.strDrink)
          && (recipe?.strArea || recipe?.strAlcoholic)
          && recipe?.strCategory) && (
            <div className={ styles.infoContainer }>
              <div className={ styles.titleAndSubtitle }>
                {returnLink(
                  <h1>
                    {recipe
                      .strMeal !== undefined
                      ? recipe.strMeal
                      : recipe.strDrink}
                  </h1>,
                  recipe,
                )}
                <h2>
                  {recipe.strArea || recipe.strAlcoholic}
                  {' '}
                  *
                  {' '}
                  {recipe.strCategory}
                </h2>
              </div>
            </div>

          )}
          <div className={ styles.icons }>
            <button
              type="button"
              onClick={ () => shareLink(recipe?.idMeal
                ? recipe.idMeal
                : recipe.idDrink, recipe) }
            >
              <img src={ share } alt="share" />
            </button>
            <button type="button" onClick={ () => removeFromFavorites(recipe) }>
              <img src={ like } alt="like" />
            </button>
          </div>
        </div>

      </div>
    );
  }

  function filterRecipes() {
    if (filter === 'All') {
      return favoriteRecipes;
    } if (filter === 'drinks') {
      return favoriteRecipes.filter((recipe) => recipe.drinkOrMeal === 'drink');
    } if (filter === 'meals') {
      return favoriteRecipes.filter((recipe) => recipe.drinkOrMeal === 'meal');
    }
    return [];
  }

  const filteredRecipes = filterRecipes();

  return (
    <>
      <Header showTopBtn={ false } />
      <div className={ styles.navContent }>
        <button type="button" onClick={ () => setFilter('All') }>
          <img src={ AllDoneRecipe } alt="AllDoneRecipes" />
        </button>
        <button type="button" onClick={ () => setFilter('drinks') }>
          <img src={ drinks } alt="Drinks" />
        </button>
        <button type="button" onClick={ () => setFilter('meals') }>
          <img src={ foods } alt="Foods" />
        </button>
      </div>
      {showCopiedUrlMessage && (
        <div className={ styles.copiedMessage }>
          <p>Link Copied !!!!</p>
        </div>
      )}
      <div className={ styles.MainCardsContainer }>
        {filteredRecipes.map((recipe) => (
          <div className={ styles.cardsContainer } key={ recipe.idMeal }>
            {returnCard(recipe)}

          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
