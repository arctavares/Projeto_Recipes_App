import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';
import AllDoneRecipe from '../../images/AllDoneRecipes.png';
import drinks from '../../images/drinks.png';
import foods from '../../images/foods.png';
import styles from './index.module.css';
import share from '../../images/Share.png';

function DoneRecipes() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('All');

  setCurrentTitle('Done Recipes');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(data.doneRecipes);
  }, []);

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
        <div className={ styles.infosContainer }>
          {((recipe?.strMeal || recipe?.strDrink)
          && (recipe.strArea
          || recipe.strAlcoholic)
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
                  {recipe.strArea}
                  {' '}
                  *
                  {' '}
                  {recipe.strCategory}
                </h2>
              </div>
              <div className={ styles.shareIcon }>
                <img src={ share } alt="share" />
              </div>

            </div>

          )}
          <div className={ styles.date }>
            Done in:
            {recipe.doneDate}
          </div>
          <div className={ styles.tag }>
            {recipe?.strTags && recipe.strTags !== null
            && recipe.strTags.split(',').splice(0, 2).map((tag, index) => (
              <div key={ index } className={ styles.tagItem }>
                {tag.trim()}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function filterRecipes() {
    if (filter === 'All') {
      return doneRecipes;
    } if (filter === 'drinks') {
      return doneRecipes.filter((recipe) => recipe.drinkOrMeal === 'drink');
    } if (filter === 'meals') {
      return doneRecipes.filter((recipe) => recipe.drinkOrMeal === 'meal');
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
      <div className={ styles.MainCardsContainer }>
        {filteredRecipes.length !== 0 ? filteredRecipes.map((recipe) => (
          <div className={ styles.cardsContainer } key={ recipe.idMeal }>
            {returnCard(recipe)}
          </div>
        ))
          : (
            <div className={ styles.noRecipesFoundContainer }>
              <h1>No recipes found!</h1>
            </div>
          )}
      </div>
    </>
  );
}

export default DoneRecipes;
