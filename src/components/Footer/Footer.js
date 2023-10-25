import { Link } from 'react-router-dom';
import styles from './index.module.css';
import DrinkIcon from '../../images/icone-drink.png';
import PlateIcon from '../../images/icone-prato.png';

function Footer() {
  return (
    <div className={ styles.footerContainer } data-testid="footer">
      <Link to="/drinks">
        <img src={ DrinkIcon } alt="Drink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ PlateIcon } alt="Meal" data-testid="meals-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
