import { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';
import AllDoneRecipe from '../../images/AllDoneRecipes.png';
import drinks from '../../images/drinks.png';
import foods from '../../images/foods.png';
import styles from './index.module.css';

function DoneRecipes() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);
  const [doneRecipes, setDoneRecipes] = useState([]);

  setCurrentTitle('Done Recipes');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(data.doneRecipes);
  }, []);

  function returnCard(recipe) {
    console.log(recipe);
    return (
      <div className={ styles.cardContainer }>
        <div className={ styles.imgContainer }>
          <img src={ recipe.strMealThumb } alt="recipe" />
        </div>
        <div>
          <div className={ styles.titleAndSubtitle }>
            <h1>{recipe.strMeal}</h1>
            <h2>
              {recipe.strArea}
              {' '}
              *
              {' '}
              {recipe.strCategory}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header showTopBtn={ false } />
      <div className={ styles.navContent }>
        <img src={ AllDoneRecipe } alt="AllDoneRecipes" />
        <img src={ drinks } alt="Drinks" />
        <img src={ foods } alt="Foods" />
      </div>
      <div className={ styles.MainCardsContainer }>
        {doneRecipes !== undefined
        && doneRecipes.length !== 0
        && doneRecipes.map((recipe) => (
          <div className={ styles.cardsContainer } key={ recipe.idMeal }>
            {returnCard(recipe)}
          </div>
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
