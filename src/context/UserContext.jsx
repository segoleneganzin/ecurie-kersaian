import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase-config';

/**
 * Contexte utilisateur pour gérer l'état de l'utilisateur.
 * @type {React.Context}
 */
export const UserContext = createContext();

/**
 * Composant fournisseur de contexte utilisateur.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {React.ReactNode} props.children - Les éléments enfants à inclure dans le contexte utilisateur.
 * @returns {JSX.Element} - Élément React représentant le composant.
 */
export const UserContextProvider = (props) => {
  /**
   * État local pour l'utilisateur actuel.
   * @type {Object}
   */
  const [currentUser, setCurrentUser] = useState();

  /**
   * État local pour indiquer le chargement des données.
   * @type {boolean}
   */
  const [loadingData, setLoadingData] = useState(true);

  /**
   * Effet secondaire pour écouter les changements d'état de l'authentification.
   * @function
   */
  useEffect(() => {
    /**
     * Fonction de désinscription pour arrêter l'écoute des changements d'état.
     * @function
     */
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    // Désinscrire l'effet lorsque le composant est démonté.
    return unsubscribe;
  }, []);

  /**
   * Fonction pour effectuer une connexion avec l'adresse e-mail et le mot de passe.
   *
   * @async
   * @function
   * @param {string} email - L'adresse e-mail de l'utilisateur.
   * @param {string} password - Le mot de passe de l'utilisateur.
   * @param {function} setValidation - Fonction pour définir les messages de validation.
   */
  const signIn = async (email, password, setValidation) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/too-many-requests') {
        setValidation(
          'Trop de tentatives de connexion, veuillez patienter et réessayer dans quelques secondes.'
        );
      } else {
        setValidation('Mail et/ou mot de passe invalide');
      }
    }
  };

  /**
   * Rendu conditionnel des enfants après le chargement des données.
   */
  return (
    <UserContext.Provider value={{ currentUser, signIn }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
};

/**
 * Propriétés attendues pour le composant UserContextProvider.
 * @type {Object}
 * @property {React.ReactNode} children - Les éléments enfants à inclure dans le contexte utilisateur.
 */
UserContextProvider.propTypes = {
  children: PropTypes.node,
};

export default UserContextProvider;
