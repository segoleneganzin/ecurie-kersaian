//**********************************************************
//Manage user's update password
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updatePassword } from 'firebase/auth';
import Form from '../../components/admin/Form';

/**
 * React component for managing user password updates.
 *
 * @component
 * @returns {JSX.Element} Le composant de gestion de la mise à jour du mot de passe.
 */
const UpdatePassword = () => {
  // Use user context to retrieve current user information
  const { currentUser } = useContext(UserContext);
  const [pwValidation, setPwValidation] = useState('');
  const [updateOkMessage, setUpdateOkMessage] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  /**
   * Function to update the user's password.
   *
   * @function
   */
  const updateUserPassword = async (newPassword, newPasswordConfirmation) => {
    try {
      if (newPassword === newPasswordConfirmation) {
        await updatePassword(currentUser, newPassword);
        setPwValidation('');
        setUpdateOkMessage(true);
      } else {
        setPwValidation('Les mots de passe de correspondent pas');
      }
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setPwValidation(
          'Votre mot de passe doit contenir plus de 8 caractères'
        );
      }
      if (error.code === 'auth/wrong-password') {
        setPwValidation('Mauvais mot de passe');
      }
    }
  };

  return currentUser ? (
    openUpdate ? (
      updateOkMessage ? (
        // Display success message after update
        <div>
          <p className='text-green-700 text-center'>
            Le mot de passe a été modifié.
          </p>
        </div>
      ) : (
        // Display password update form
        <>
          <Form
            onSubmitFunction={updateUserPassword}
            btnText={'Valider'}
            validation={pwValidation}
            title={'Modifier votre mot de passe'}
            fieldNames={['newPassword', 'newPasswordConfirmation']}
          />
          <p>{pwValidation}</p>
          <div className='italic text-sm my-2 pt-2 border-t-2 border-secondary-color'>
            <p>
              Le mot de passe doit avoir un minimum de 8 caractères et comporter
              au moins :
            </p>
            <ul className='mt-2'>
              <li>* Une lettre majuscule</li>
              <li>* Une lettre minuscule</li>
              <li>* Un chiffre</li>
              <li>* Un caractère spécial</li>
            </ul>
          </div>
        </>
      )
    ) : (
      // Reauthentication required to update user data
      <div>
        <h2 className='text-white text-xl text-center font-bold bg-red-900 rounded-t-sm mb-4'>
          Modifier votre mot de passe
        </h2>
        <ReauthenticateForm setOpenUpdate={setOpenUpdate} />
      </div>
    )
  ) : (
    // If the user is not logged in, display nothing
    ''
  );
};

UpdatePassword.propTypes = {
  setUpdatePasswordOpen: PropTypes.func,
};

export default UpdatePassword;
