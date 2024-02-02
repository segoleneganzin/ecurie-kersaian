/* eslint-disable react/no-unescaped-entities */

import { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import UpdateMail from './forms/auth/UpdateMail';
import UpdatePassword from './forms/auth/UpdatePassword';
import { buttonClassName } from '../utils/GeneralClassNames';

/**
 * Composant React pour la gestion des mises à jour du compte utilisateur.
 *
 * @component
 * @returns {JSX.Element} Le composant de gestion des mises à jour du compte utilisateur.
 */
const UpdateLog = () => {
  // Références pour les composants de mise à jour
  const updatePasswordRef = useRef();
  const updateMailRef = useRef();

  // États pour gérer l'ouverture des composants de mise à jour
  const [updateEmailOpen, setUpdateEmailOpen] = useState(false);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);

  /**
   * Fonction pour basculer l'état d'ouverture du composant de mise à jour de l'adresse e-mail.
   *
   * @function
   */
  const toggleUpdateEmail = () => {
    setUpdateEmailOpen(!updateEmailOpen);
    updatePasswordOpen && setUpdatePasswordOpen(false);
  };

  /**
   * Fonction pour basculer l'état d'ouverture du composant de mise à jour du mot de passe.
   *
   * @function
   */
  const toggleUpdatePassword = () => {
    setUpdatePasswordOpen(!updatePasswordOpen);
    updateEmailOpen && setUpdateEmailOpen(false);
  };

  /**
   * Fonction pour déconnecter l'utilisateur.
   *
   * @function
   */
  const signOutUser = () => {
    signOut(auth);
  };

  // Rendu du composant
  return (
    <div className='flex flex-col gap-6 mt-8'>
      {/* Bouton pour ouvrir/fermer le composant de mise à jour de l'adresse e-mail */}
      <button
        onClick={toggleUpdateEmail}
        ref={updateMailRef}
        className={
          buttonClassName + ' bg-principal-color hover:bg-secondary-color'
        }
      >
        Modifier votre adresse email
      </button>

      {/* Affichage du composant de mise à jour de l'adresse e-mail si l'état est vrai */}
      {updateEmailOpen && <UpdateMail />}

      {/* Bouton pour ouvrir/fermer le composant de mise à jour du mot de passe */}
      <button
        onClick={toggleUpdatePassword}
        ref={updatePasswordRef}
        className={
          buttonClassName + ' bg-principal-color hover:bg-secondary-color'
        }
      >
        Modifier votre mot de passe
      </button>

      {/* Affichage du composant de mise à jour du mot de passe si l'état est vrai */}
      {updatePasswordOpen && <UpdatePassword />}

      {/* Bouton pour déconnecter l'utilisateur */}
      <button
        onClick={signOutUser}
        ref={updatePasswordRef}
        className={buttonClassName + ' bg-red-800 hover:bg-red-600'}
      >
        Déconnexion
      </button>
    </div>
  );
};

export default UpdateLog;
