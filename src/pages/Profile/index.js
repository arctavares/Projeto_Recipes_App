import { useContext } from 'react';
import Header from '../../components/Header/Header';
import RecipesContext from '../../context';

function Profile() {
  const {
    setCurrentTitle,
  } = useContext(RecipesContext);

  setCurrentTitle('Profile');

  return (
    <Header showTopBtn={ false } />
  );
}

export default Profile;
