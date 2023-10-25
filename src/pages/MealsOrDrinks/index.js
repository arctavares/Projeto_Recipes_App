import PropTypes from 'prop-types';
import { useContext } from 'react';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';
import Recipes from '../../components/Recipes/Recipes';
import Footer from '../../components/Footer/Footer';

function MealsOrDrinks({ title }) {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);

  setCurrentTitle(title);

  return (
    <>
      <Header />
      <Recipes />
      <Footer />
    </>
  );
}

export default MealsOrDrinks;

MealsOrDrinks.propTypes = {
  title: PropTypes.string.isRequired,
};
