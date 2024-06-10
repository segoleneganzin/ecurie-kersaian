import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase-config';

/**
 * User context for managing user state.
 * @type {React.Context}
 */
export const UserContext = createContext();

/**
 * Provider component for the user context.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export const UserContextProvider = (props) => {
  // Local state for the current user.
  const [currentUser, setCurrentUser] = useState();
  // Local state to indicate data loading.
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    /**
     * Unsubscribe function to stop listening for state changes.
     * @function
     */
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Function to sign in with email and password.
   *
   * @async
   * @function
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   * @param {function} setValidation - Function to set validation messages.
   */
  const signIn = async (email, password, setValidation) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/too-many-requests') {
        setValidation(
          'Trop de tentatives de connexion, veuillez patienter un instant avant de réessayer'
        );
      } else {
        setValidation('Email et/ou mot de passe invalides');
      }
    }
  };

  /**
   * Conditional rendering of children after data loading.
   */
  return (
    <UserContext.Provider value={{ currentUser, signIn }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
};

/**
 * Expected properties for the UserContextProvider component.
 * @type {Object}
 * @property {React.ReactNode} children - The child elements to include in the user context.
 */
UserContextProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContextProvider;
