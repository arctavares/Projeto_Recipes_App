import { useContext } from 'react';
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

  setCurrentTitle('Done Recipes');

  return (
    <>
      <Header showTopBtn={ false } />
      <div className={ styles.navContent }>
        <img src={ AllDoneRecipe } alt="AllDoneRecipes" />
        <img src={ drinks } alt="Drinks" />
        <img src={ foods } alt="Foods" />
      </div>
    </>
  );
}

export default DoneRecipes;
