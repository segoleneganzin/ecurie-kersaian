//**********************************************************
//Manage user's update password
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updatePassword } from 'firebase/auth';
import { formFieldsConfig } from '../../../formFieldsconfig';
import { Form } from 'sg-form-lib';

/**
 * React component for managing user password updates.
 *
 * @component
 * @returns {JSX.Element} Le composant de gestion de la mise à jour du mot de passe.
 */
const UpdatePassword = () => {
  // Use user context to retrieve current user information
  const { currentUser } = useContext(UserContext);
  //display message for user
  const [errorMessage, setErrorMessage] = useState('');
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
        setErrorMessage('');
        setUpdateOkMessage(true);
      } else {
        setErrorMessage('Les mots de passe de correspondent pas');
      }
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setErrorMessage(
          'Votre mot de passe doit contenir plus de 8 caractères'
        );
      }
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Mauvais mot de passe');
      }
    }
  };

  return (
    currentUser && (
      <>
        {openUpdate ? (
          updateOkMessage ? (
            // Display success message after update
            <>
              <p className='text-green-700 text-center'>
                Le mot de passe a été modifié.
              </p>
            </>
          ) : (
            // Display password update form
            <>
              <Form
                fieldsConfig={formFieldsConfig}
                onSubmitFunction={updateUserPassword}
                btnText={'Valider'}
                errorMessage={errorMessage}
                title={'Modifier votre mot de passe'}
                fieldNames={['password', 'passwordConfirmation']}
              />
              <div className='italic text-sm my-2 pt-2 border-t-2 border-secondary-color'>
                <p>
                  Le mot de passe doit avoir un minimum de 8 caractères et
                  comporter au moins :
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
          <>
            <ReauthenticateForm
              type={'mot de passe'}
              setOpenUpdate={setOpenUpdate}
            />
          </>
        )}
      </>
    )
  );
};

UpdatePassword.propTypes = {
  setUpdatePasswordOpen: PropTypes.func.isRequired,
};

export default UpdatePassword;
