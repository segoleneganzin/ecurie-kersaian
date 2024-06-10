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
 * @param {Function} setOpenUpdate
 * @param {string} type - email or password
 * @returns {JSX.Element}
 */
const ReauthenticateForm = ({ type, setOpenUpdate }) => {
  const { currentUser } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Function for reauthentication and opening the update form.
   * @async
   * @function
   * @param {string} email
   * @param {string} password
   * @throws {Error} Error if reauthentication fails.
   */
  const reauthenticate = async (email, password) => {
    try {
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
