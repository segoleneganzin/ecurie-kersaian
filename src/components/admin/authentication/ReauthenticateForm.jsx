import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Form } from 'sg-form-lib';
import { formFieldsConfig } from '../../../formFieldsconfig';

/**
 * ReauthenticateForm component for handling reauthentication before updating sensitive information.
 *
 * @component
 * @param {Object} props
 * @param {Function} setOpenUpdate - Function to control visibility of the update form.
 * @param {string} type - Function to control visibility of the update form.
 * @returns {JSX.Element}
 */
const ReauthenticateForm = ({ type, setOpenUpdate }) => {
  // Using the user context for the login function
  const { currentUser } = useContext(UserContext);

  // Status to manage validation message in case of error  const [validation, setValidation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Function for reauthentication and opening the update form.
   *
   * @async
   * @function
   * @throws {Error} Error if reauthentication fails.
   */
  const reauthenticate = async (email, password) => {
    try {
      // Check if the entered email matches the current user
      if (email === currentUser.email) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        reauthenticateWithCredential(currentUser, credential)
          .then(() => {
            // If login is successful, open the update form
            setOpenUpdate(true);
          })
          .catch((error) => {
            console.error('Error during reauthentication', error);
            setErrorMessage('Votre mot de passe est incorrect');
          });
      } else {
        // If email does not match the current user, display an error message
        setErrorMessage('Votre email est incorrect');
      }
    } catch (error) {
      // Error handling
      setErrorMessage("Une erreur s'est produite");
    }
  };

  return (
    <Form
      fieldsConfig={formFieldsConfig}
      title={`Modifier votre ${type}`}
      subtitle={'Pour des raisons de sécurité, veuillez vous réauthentifier'}
      onSubmitFunction={reauthenticate}
      btnText={'Valider'}
      errorMessage={errorMessage}
      fieldNames={['email', 'password']}
    />
  );
};

ReauthenticateForm.propTypes = {
  type: PropTypes.string.isRequired,
  setOpenUpdate: PropTypes.func.isRequired,
};

export default ReauthenticateForm;
