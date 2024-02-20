import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

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
 * @param {React.ReactNode} props.children - The child elements to include in the user context.
 * @returns {JSX.Element}
 */
export const UserContextProvider = (props) => {
  // Local state for the current user.
  const [currentUser, setCurrentUser] = useState();
  // Local state to indicate data loading.
  const [loadingData, setLoadingData] = useState(true);
  // Local state to indicate user activity timeout.
  const [inactiveTimeout, setInactiveTimeout] = useState(null);

  /**
   * Side effect to listen for authentication state changes.
   * @function
   */
  useEffect(() => {
    /**
     * Unsubscribe function to stop listening for state changes.
     * @function
     */
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
      // Reset the inactive timeout on every user change
      setInactiveTimeout(null);
      startInactiveTimeout();
      startUserActivityListener();
    });
    return () => {
      unsubscribe();
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startInactiveTimeout = () => {
    // Set the inactive timeout to 30 minutes (in milliseconds)
    const inactiveDelay = 30 * 60 * 1000;
    // Clear existing inactive timeout if any
    if (inactiveTimeout) {
      clearTimeout(inactiveTimeout);
    }

    // Set a new inactive timeout
    const newInactiveTimeout = setTimeout(() => {
      // Logout function after inactive timeout
      signOut(auth);
    }, inactiveDelay);

    setInactiveTimeout(newInactiveTimeout);
  };

  const startUserActivityListener = () => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
  };

  const handleUserActivity = () => {
    // User performed an action, reset the inactive timeout
    startInactiveTimeout();
  };

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
          'Too many login attempts, please wait and try again in a few seconds.'
        );
      } else {
        setValidation('Invalid email and/or password');
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
