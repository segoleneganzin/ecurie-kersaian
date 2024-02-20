import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
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
 * React component for the re-authentication form.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setOpenUpdate
 * @returns {JSX.Element}
 */
const ReauthenticateForm = (props) => {
  // Using the user context for the login function
  const { currentUser } = useContext(UserContext);

  // Status to manage validation message in case of error  const [validation, setValidation] = useState('');
  const [validation, setValidation] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
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
    password: errors.password ? 'Veuillez rentrer votre mot de passe' : '',
  };

  /**
   * Function for re-authentication and opening the update.
   *
   * @async
   * @function
   * @throws {Error} An error if re-authentication fails.
   */
  const reauthenticate = async () => {
    try {
      if (getValues('email') === currentUser.email) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          getValues('password')
        );
        reauthenticateWithCredential(currentUser, credential)
          .then(() => {
            props.setOpenUpdate(true);
          })
          .catch((error) => {
            console.error('Erreur lors de la réauthentification', error);
          });
      } else {
        setValidation('Votre email est erroné');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(reauthenticate)}
        className={formClassName}
        noValidate
      >
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
        <div className={formDataContainerClassName}>
          <label htmlFor='password' className={labelClassName}>
            Mot de passe
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className={inputErrorClass('password')}
            {...register('password', { required: true })}
          />
          {errors.password && (
            <p className={errorMessageClassName}>
              {inputErrorMessage.password}
            </p>
          )}
        </div>
        <p>{validation}</p>
        <button
          className={buttonClassName + ' bg-green-700 hover:bg-green-600'}
        >
          Connexion
        </button>
      </form>
    </div>
  );
};

ReauthenticateForm.propTypes = {
  setOpenUpdate: PropTypes.func,
};

export default ReauthenticateForm;
