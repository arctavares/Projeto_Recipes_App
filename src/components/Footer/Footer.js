import styles from './index.module.css';
import DrinkIcon from '../../images/icone-drink.png';
import PlateIcon from '../../images/icone-prato.png';

function Footer() {
  return (
    <div className={ styles.footerContainer } data-testid="footer">
      <img src={ `${DrinkIcon}drinkIcon` } alt="Drink" data-testid="drinks-bottom-btn" />
      <img src={ `${PlateIcon}mealIcon` } alt="Meal" data-testid="meals-bottom-btn" />
    </div>
  );
}

export default Footer;
