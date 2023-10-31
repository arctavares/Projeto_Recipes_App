import { useContext } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';
import Footer from '../../components/Footer/Footer';
import done from '../../images/done.png';
import favorite from '../../images/favorite.png';
import Logout from '../../images/Logout.png';
import styles from './index.module.css';

function Profile() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);

  setCurrentTitle('Profile');

  const navigate = useNavigate();

  function returnEmail() {
    const { email } = JSON.parse(localStorage.getItem('user'));
    return (
      <h1>{email}</h1>
    );
  }

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <Header showTopBtn={ false } />
      <div className={ styles.emailContainer }>
        {returnEmail()}
      </div>
      <div className={ styles.imgContainer }>
        <button
          className={ styles.imgButton }
          onClick={ () => navigate('/done-recipes') }
          type="button"
        >
          <img src={ done } alt="done" />
        </button>
        <button
          type="button"
          className={ styles.imgButton }
          onClick={ () => navigate('/favorite-recipes') }
        >
          <img
            src={ favorite }
            alt="favorite"
          />
        </button>
        <button
          onClick={ handleLogout }
          className={ styles.imgButton }
          type="button"
        >
          <img
            src={ Logout }
            alt="Logout"
          />
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
