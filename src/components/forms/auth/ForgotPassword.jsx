import PropTypes from 'prop-types';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase-config';
import { useForm } from 'react-hook-form';
import {
  formClassName,
  labelClassName,
  formDataContainerClassName,
  inputClassName,
  inputErrorClassName,
  errorMessageClassName,
  buttonClassName,
} from '../../../utils/GeneralClassNames';
/**
 * React component for password reset.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setForgotPassword
 * @returns {JSX.Element}
 */
function ForgotPassword(props) {
  // Status to manage the display of the success message after sending the reset email
  const [emailResetOk, setEmailResetOk] = useState(false);

  // Status to manage validation message in case of error
  const [validation, setValidation] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  /**
   * Function to obtain the error class for a given field.
   * @param {string} field
   * @returns {string} - Field error class.
   */
  const inputErrorClass = (field) => {
    return errors[field]
      ? inputErrorClassName + ' min-w-52'
      : inputClassName + ' min-w-52';
  };

  // Error messages for form fields
  const inputErrorMessage = {
    email: errors.email ? 'Veuillez rentrer votre email' : '',
  };

  // Function to send a password reset request via Firebase
  const passwordReset = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  // Form submit
  const handleForm = async () => {
    try {
      await passwordReset(getValues('email'));

      // Display success message
      setEmailResetOk(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setValidation('Utilisateur inconnu');
        setValue('email', '');
      }
    }
  };

  return emailResetOk ? (
    <div className='forgot-password update-form'>
      <p className='text-green-800 text-center mb-4'>
        L&apos;email a été envoyé.
      </p>
      <button
        className={buttonClassName + ' bg-secondary-color'}
        onClick={() => props.setForgotPassword(false)}
      >
        {' '}
        Retour
      </button>
    </div>
  ) : (
    <div>
      <form
        onSubmit={handleSubmit(handleForm)}
        className={
          formClassName +
          'bg-secondary-color border-2 border-principal-color p-4 rounded-lg max-w-sm mx-auto'
        }
        noValidate
      >
        <h2 className='text-white text-xl text-center font-bold bg-red-900 rounded-t-sm mb-4'>
          Mot de passe oublié
        </h2>
        <div className={formDataContainerClassName}>
          <label htmlFor='email' className={labelClassName}>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className={inputErrorClass('email')}
            {...register('email', {
              required: true,
              pattern: /\S+@\S+\.\S+/,
            })}
          />
          {errors.email?.type === 'required' && (
            <p className={errorMessageClassName}>{inputErrorMessage.email}</p>
          )}
          {errors.email?.type === 'pattern' && (
            <p className={errorMessageClassName}> Email invalide</p>
          )}
        </div>
        <p className='validation error'>{validation}</p>
        <button
          className={
            buttonClassName +
            ' bg-green-700 hover:bg-green-600 flex justify-center'
          }
        >
          Réinitialiser le mot de passe
        </button>
      </form>
      <button
        className={buttonClassName + ' flex justify-center'}
        onClick={() => props.setForgotPassword(false)}
      >
        {' '}
        Retour
      </button>
    </div>
  );
}

ForgotPassword.propTypes = {
  setForgotPassword: PropTypes.func,
};

export default ForgotPassword;
