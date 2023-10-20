import PropTypes from 'prop-types';
import styles from './index.module.css';
import RecipesAppTitle from '../../images/logo text Recipes app.png';
import RecipesAppIcon from '../../images/ícone Recipes app.png';
import SearchIcon from '../../images/icone pesquiar.png';
import ProfileIcon from '../../images/icone-perfil.png';
import DrinkIcon from '../../images/icone-drink.png';
import PlateIcon from '../../images/icone-prato.png';

function Header({ showTopBtn = true, title = 'Meals' }) {
  function showDrinkOrPlate() {
    if (title.toLowerCase() === 'meals') {
      return (
        <img src={ PlateIcon } alt="Plate" />
      );
    }
    return (
      <img src={ DrinkIcon } alt="Drink" />
    );
  }

  return (
    <div className={ styles.HeaderContainer }>
      <div className={ styles.nav }>
        <div className={ styles.appTitle }>
          <img
            src={ RecipesAppIcon }
            alt="Recipes App Title"
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
              <img src={ SearchIcon } alt="Search" className={ styles.searchIcon } />
            )
          }
          <img src={ ProfileIcon } alt="Profile" className={ styles.profileIcon } />
        </div>
      </div>
      <div className={ styles.titleContainer }>
        {showDrinkOrPlate()}
        <h1 className={ styles.title }>{title}</h1>
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  showTopBtn: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
