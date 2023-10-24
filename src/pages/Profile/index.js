import { useContext } from 'react';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';
import Footer from '../../components/Footer/Footer';

function Profile() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);

  setCurrentTitle('Profile');

  return (
    <>
      <Header showTopBtn={ false } />
      <Footer />
    </>
  );
}

export default Profile;
