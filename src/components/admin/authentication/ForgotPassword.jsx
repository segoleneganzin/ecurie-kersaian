import PropTypes from 'prop-types';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { buttonClassName } from '../../../utils/GeneralClassNames';
import { Form } from 'sg-form-lib';
import { formFieldsConfig } from '../../../formFieldsconfig';

/**
 * React component for password reset.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setForgotPassword
 * @returns {JSX.Element}
 */
const ForgotPassword = (props) => {
  const [emailMessage, setEmailMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Sends a password reset email using Firebase authentication.
   * @param {string} email - The email for which to send a password reset email.
   * @returns {Promise<void>} - A promise that resolves when the email is sent.
   */
  const passwordReset = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  /**
   * Handles the form submission.
   */
  const handleForm = async (email) => {
    try {
      await passwordReset(email);
      setEmailMessage(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Utilisateur inconnu');
      }
    }
  };

  return (
    <div className='flex flex-col justify-center w-fit m-auto p-8 rounded-lg'>
      {emailMessage ? (
        // Display message after email is sent
        <>
          <p className='text-green-800 text-center mb-4'>
            L&apos;email a été envoyé.
          </p>
          <button
            className={buttonClassName + ' bg-secondary-color'}
            onClick={() => props.setForgotPassword(false)}
          >
            Retour
          </button>
        </>
      ) : (
        // Display the password reset form
        <>
          <Form
            fieldsConfig={formFieldsConfig}
            onSubmitFunction={handleForm}
            btnText={'Réinitialiser le mot de passe'}
            errorMessage={errorMessage}
            title={'Mot de passe oublié'}
            fieldNames={['email']}
            origin={'forgotPassword'}
          />
          <button
            className={
              buttonClassName +
              ' flex justify-center bg-red-800 hover:bg-red-600 mt-6'
            }
            onClick={() => props.setForgotPassword(false)}
          >
            Retour
          </button>
        </>
      )}
    </div>
  );
};

ForgotPassword.propTypes = {
  setForgotPassword: PropTypes.func.isRequired,
};

export default ForgotPassword;
