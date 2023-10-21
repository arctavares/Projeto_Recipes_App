import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';

function MealsOrDrinks({ title }) {
  return (
    <Header title={ title } />
  );
}

export default MealsOrDrinks;

MealsOrDrinks.propTypes = {
  title: PropTypes.string.isRequired,
};
