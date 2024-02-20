//**********************************************************
//Manage user's update password
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updatePassword } from 'firebase/auth';
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
    newPassword: errors.newPassword ? 'Veuillez rentrer un mot de passe' : '',
    newPasswordConfirmation: errors.newPasswordConfirmation
      ? 'Veuillez rentrer un mot de passe identique'
      : '',
  };

  /**
   * Function to update the user's password.
   *
   * @function
   */
  const updateUserPassword = async () => {
    try {
      if (getValues('newPassword') === getValues('newPasswordConfirmation')) {
        await updatePassword(currentUser, getValues('newPassword'));
        setPwValidation('');
        setUpdateOkMessage(true);
      } else {
        setPwValidation('Les mots de passe ne correspondent pas');
      }
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setPwValidation(
          'Votre mot de passe doit contenir plus de 5 caractères'
        );
      }
      if (error.code === 'auth/wrong-password') {
        setPwValidation('Mauvais mot de passe');
      }
      console.log(error);
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
        <div>
          <form
            onSubmit={handleSubmit(updateUserPassword)}
            className={formClassName}
            noValidate
          >
            <div className={formDataContainerClassName}>
              <label htmlFor='newPassword' className={labelClassName}>
                Nouveau mot de passe :
              </label>
              <input
                id='newPassword'
                name='newPassword'
                type='password'
                className={inputErrorClass('newPassword')}
                {...register('newPassword', {
                  required: true,
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                })}
              />
              {errors.newPassword?.type === 'required' && (
                <p className={errorMessageClassName}>
                  {inputErrorMessage.newPassword}
                </p>
              )}
              {errors.newPassword?.type === 'pattern' && (
                <p className={errorMessageClassName}>
                  Le mot de passe n&apos;est pas valide
                </p>
              )}
            </div>
            <div className={formDataContainerClassName}>
              <label
                htmlFor='newPasswordConfirmation'
                className={labelClassName}
              >
                Confirmer votre nouveau mot de passe:
              </label>
              <input
                id='newPasswordConfirmation'
                name='newPasswordConfirmation'
                type='password'
                className={inputErrorClass('newPasswordConfirmation')}
                {...register('newPasswordConfirmation', {
                  required: true,
                  pattern:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                })}
              />
              {errors.newPasswordConfirmation?.type === 'required' && (
                <p className={errorMessageClassName}>
                  {inputErrorMessage.newPasswordConfirmation}
                </p>
              )}
              {errors.newPasswordConfirmation?.type === 'pattern' && (
                <p className={errorMessageClassName}>
                  Le mot de passe n&apos;est pas valide
                </p>
              )}
            </div>
            <p>{pwValidation}</p>
            <button
              className={buttonClassName + ' bg-green-700 hover:bg-green-600'}
            >
              Valider
            </button>
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
          </form>
        </div>
      )
    ) : (
      // Reauthentication required to update user data
      <div className='update-form'>
        <p className='ps__form-subtitle'>
          Veuillez vous réauthentifier pour modifier votre mot de passe
        </p>
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
