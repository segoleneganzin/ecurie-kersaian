/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useForm } from 'react-hook-form';

function ForgotPassword(props) {
  const [emailMessage, setEmailMessage] = useState(false);
  const [validation, setValidation] = useState('');

  // ************** CLASSNAMES
  const formClassName =
    'bg-secondary-color mt-4 mx-6 border-2 border-principal-color p-4 rounded-lg max-w-sm mx-auto';
  const formDataContainerClassName = 'mb-4';
  const labelClassName = 'pr-2 text-lg font-bold text-white';
  const inputClassName =
    'border-b border-white w-full bg-secondary-color text-white';
  const inputErrorClassName =
    'border-b border-red-300 w-full bg-secondary-color  text-white';
  const errorMessageClassName = 'text-red-200';
  const buttonClassName =
    'm-auto flex justify-center w-fit rounded-md px-4 py-2 text-white shadow-sm transition ease-in-out duration-150 tracking-wider';
  //******************************* Gestion des erreurs dans le formulaire modal
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const inputErrorClass = (field) => {
    return errors[field] ? inputErrorClassName : inputClassName;
  };

  const inputErrorMessage = {
    email: errors.email ? 'Veuillez rentrer votre email' : '',
  };

  const passwordReset = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };
  const handleForm = async () => {
    try {
      await passwordReset(getValues('email'));
      setEmailMessage(true);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setValidation('Utilisateur inconnu');
        setValue('email', '');
      }
    }
  };

  return emailMessage ? (
    <div className='forgot-password update-form'>
      <p className='text-green-800 text-center mb-4'>L'email a été envoyé.</p>
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
        className={formClassName}
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
          className={buttonClassName + ' bg-green-700 hover:bg-green-600'}
        >
          Réinitialiser le mot de passe
        </button>
      </form>
      <button
        className={buttonClassName}
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
