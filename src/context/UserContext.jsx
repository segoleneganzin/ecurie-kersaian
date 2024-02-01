import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase-config';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  //allows to subscribe to the users current authentication state,
  //and receive an event whenever that state changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email, password, setValidation, isConnected) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (isConnected != null) {
        isConnected = true;
      }
    } catch (error) {
      console.log(error.code);

      if (error.code === 'auth/too-many-requests') {
        setValidation(
          'Trop de tentatives de connexion, veuillez patientez et réessayer dans quelques secondes.'
        );
      } else {
        setValidation('Mail et/ou mot de passe invalide');
      }
    }
    return isConnected;
  };

  return (
    <UserContext.Provider value={{ currentUser, signIn }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
};
UserContextProvider.propTypes = {
  children: PropTypes.node,
};
export default UserContextProvider;
