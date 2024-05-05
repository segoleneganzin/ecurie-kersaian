import PropTypes from 'prop-types';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { buttonClassName } from '../../utils/GeneralClassNames';
import Form from '../../components/admin/Form';

/**
 * React component for password reset.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setForgotPassword
 * @returns {JSX.Element}
 */
const ForgotPassword = (props) => {
  // Status to manage the display of the success message after sending the reset email
  const [emailResetOk, setEmailResetOk] = useState(false);

  // Status to manage validation message in case of error
  const [validation, setValidation] = useState('');

  // Function to send a password reset request via Firebase
  const passwordReset = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  // Form submit
  const handleForm = async (email) => {
    try {
      await passwordReset(email);
      // Display success message
      setEmailResetOk(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setValidation('Utilisateur inconnu');
      }
    }
  };

  return emailResetOk ? (
    <div className='flex flex-col justify-center bg-white w-fit m-auto p-8 rounded-lg'>
      <p className='text-green-800 text-center mb-4'>
        L&apos;email a été envoyé.
      </p>
      <button
        className={buttonClassName + ' bg-secondary-color'}
        onClick={() => props.setForgotPassword(false)}
      >
        Retour
      </button>
    </div>
  ) : (
    <div>
      <Form
        onSubmitFunction={handleForm}
        btnText={'Réinitialiser le mot de passe'}
        validation={validation}
        title={'Mot de passe oublié'}
        fieldNames={['email']}
        classnames={
          ' bg-secondary-color border-2 border-principal-color p-4 rounded-lg max-w-sm mx-auto'
        }
      />
      <button
        className={buttonClassName + ' flex justify-center'}
        onClick={() => props.setForgotPassword(false)}
      >
        Retour
      </button>
    </div>
  );
};

ForgotPassword.propTypes = {
  setForgotPassword: PropTypes.func,
};

export default ForgotPassword;
