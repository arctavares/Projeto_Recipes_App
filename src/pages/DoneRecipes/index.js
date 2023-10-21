import { useContext } from 'react';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';

function DoneRecipes() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);

  setCurrentTitle('Done Recipes');

  return (
    <Header showTopBtn={ false } />
  );
}

export default DoneRecipes;
