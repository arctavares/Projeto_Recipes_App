import { useContext } from 'react';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';

function FavoriteRecipes() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);

  setCurrentTitle('Favorite Recipes');

  return (
    <Header showTopBtn={ false } />
  );
}

export default FavoriteRecipes;
