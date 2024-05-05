import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import Form from '../../components/admin/Form';

/**
 * React component for the re-authentication form.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setOpenUpdate
 * @returns {JSX.Element}
 */
const ReauthenticateForm = ({ setOpenUpdate }) => {
  // Using the user context for the login function
  const { currentUser } = useContext(UserContext);

  // Status to manage validation message in case of error  const [validation, setValidation] = useState('');
  const [validation, setValidation] = useState('');

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
            setValidation('Votre mot de passe est incorrect');
          });
      } else {
        // If email does not match the current user, display an error message
        setValidation('Votre email est incorrect');
      }
    } catch (error) {
      // Error handling
      console.error(error);
    }
  };

  return (
    <>
      <p>Pour des raisons de sécurité, veuillez vous réauthentifier</p>
      <Form
        onSubmitFunction={reauthenticate}
        btnText={'Valider'}
        validation={validation}
        fieldNames={['email', 'password']}
      />
    </>
  );
};

ReauthenticateForm.propTypes = {
  setOpenUpdate: PropTypes.func.isRequired,
};

export default ReauthenticateForm;
