import { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import UpdateMail from './UpdateMail';
import UpdatePassword from './UpdatePassword';
import { buttonClassName } from '../../utils/GeneralClassNames';

/**
 * React component for managing user account updates.
 *
 * @component
 * @returns {JSX.Element}
 */
const UpdateLog = () => {
  const updateMailRef = useRef();
  const [updateEmailOpen, setUpdateEmailOpen] = useState(false);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);

  const toggleUpdateEmail = () => {
    setUpdateEmailOpen(!updateEmailOpen);
    updatePasswordOpen && setUpdatePasswordOpen(false);
  };

  const toggleUpdatePassword = () => {
    setUpdatePasswordOpen(!updatePasswordOpen);
    updateEmailOpen && setUpdateEmailOpen(false);
  };

  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <div className='flex flex-col gap-4 mt-8'>
      {/* Button to open/close e-mail address update component */}
      {!updateEmailOpen && (
        <button
          onClick={toggleUpdateEmail}
          ref={updateMailRef}
          className={
            buttonClassName + ' bg-principal-color hover:bg-secondary-color'
          }
        >
          Modifier votre adresse email
        </button>
      )}
      {/* Display e-mail address update component if status is true */}
      {updateEmailOpen && (
        <div>
          <UpdateMail />
        </div>
      )}
      {/* Button to open/close password update component */}
      {!updatePasswordOpen && (
        <button
          onClick={toggleUpdatePassword}
          className={
            buttonClassName + ' bg-principal-color hover:bg-secondary-color'
          }
        >
          Modifier votre mot de passe
        </button>
      )}
      {/* Display password update component if status is true */}
      {updatePasswordOpen && (
        <div>
          <UpdatePassword />
        </div>
      )}
      {/* Bouton pour déconnecter l'utilisateur */}
      <button
        onClick={signOutUser}
        className={buttonClassName + ' bg-red-800 hover:bg-red-600'}
      >
        Déconnexion
      </button>
    </div>
  );
};

export default UpdateLog;
