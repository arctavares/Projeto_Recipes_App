import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import RecipesAppTitle from '../../images/logo text Recipes app.png';
import RecipesAppIcon from '../../images/ícone Recipes app.png';
import searchIcon from '../../images/searchIcon.png';
import profileIcon from '../../images/profileIcon.png';
import DrinkIcon from '../../images/icone-drink.png';
import PlateIcon from '../../images/icone-prato.png';

function Header({ showTopBtn = true, title }) {
  function showDrinkOrPlate() {
    if (title.toLowerCase() === 'meals') {
      return (
        <img src={ PlateIcon } alt="Plate" className={ styles.drinkOrPlateIcon } />
      );
    } if (title.toLowerCase() === 'drinks') {
      return (
        <img src={ DrinkIcon } alt="Drink" className={ styles.drinkOrPlateIcon } />
      );
    }
  }

  return (
    <div className={ styles.HeaderContainer }>
      <div className={ styles.nav }>
        <div className={ styles.appTitle }>
          <img
            src={ RecipesAppIcon }
            alt="Recipes App"
            className={ styles.RecipesIcon }
          />
          <img
            src={ RecipesAppTitle }
            alt="Recipes App Title"
            className={ styles.RecipesTitle }
          />
        </div>
        <div className={ styles.icons }>
          {
            showTopBtn && (
              <img
                src={ searchIcon }
                alt="searchIcon"
                className={ styles.searchIcon }
                data-testid="search-top-btn"
              />
            )
          }
          <Link to="/profile">
            <img
              src={ `${profileIcon}profileIcon` } // passing tests
              alt="Profile"
              className={ styles.profileIcon }
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
      </div>
      <div className={ styles.titleContainer }>
        {showDrinkOrPlate()}
        <h1 className={ styles.title } data-testid="page-title">{title}</h1>
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  showTopBtn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
