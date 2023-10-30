import { useContext, useEffect, useState } from 'react';
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

  function returnCard(recipe) {
    return (

      <div className={ styles.cardContainer }>
        <div className={ styles.imgContainer }>
          {
            (recipe?.strMealThumb
              || recipe?.strDrinkThumb)
              && <img src={ recipe.strMealThumb || recipe.strDrinkThumb } alt="recipe" />
          }
        </div>
        <div>
          {((recipe?.strMeal || recipe?.strDrink)
          && (recipe.strArea
          || recipe.strAlcoholic)
          && recipe?.strCategory) && (
            <div className={ styles.infoContainer }>
              <div className={ styles.titleAndSubtitle }>
                <h1>{recipe.strMeal !== undefined ? recipe.strMeal : recipe.strDrink}</h1>
                <h2>
                  {recipe.strArea}
                  {' '}
                  *
                  {' '}
                  {recipe.strCategory}
                </h2>
              </div>
              <div>
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
