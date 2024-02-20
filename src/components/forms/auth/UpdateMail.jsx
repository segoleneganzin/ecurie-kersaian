//**********************************************************
//Manage user's update email
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updateEmail } from 'firebase/auth';
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
 * React component for managing user e-mail address updates.
 *
 * @component
 * @returns {JSX.Element}
 */
const UpdateMail = () => {
  // Use user context to retrieve current user information
  const { currentUser } = useContext(UserContext);

  const [emailValidation, setEmailValidation] = useState('');
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
    newEmail: errors.newEmail ? 'Veuillez rentrer un email' : '',
  };

  /**
   * Function to update the user's e-mail address.
   *
   * @function
   */
  const updateUserEmail = async () => {
    try {
      const newEmail = getValues('newEmail');
      await updateEmail(currentUser, newEmail);
      setEmailValidation('');
      setUpdateOkMessage(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailValidation('Cet email est déjà utilisé');
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
            L&apos;email a été modifié.
          </p>
        </div>
      ) : (
        // Display e-mail address update form
        <div>
          <form
            onSubmit={handleSubmit(updateUserEmail)}
            className={formClassName}
            noValidate
          >
            <p className={formDataContainerClassName}>
              <span className={labelClassName}>E-mail actuel :</span>{' '}
              {currentUser.email}
            </p>
            <div className={formDataContainerClassName}>
              <label htmlFor='newEmail' className={labelClassName}>
                Nouvel e-mail :
              </label>
              <input
                id='newEmail'
                name='newEmail'
                type='email'
                className={inputErrorClass('newEmail')}
                {...register('newEmail', {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
              />
              {errors.newEmail?.type === 'required' && (
                <p className={errorMessageClassName}>
                  {inputErrorMessage.newEmail}
                </p>
              )}
              {errors.newEmail?.type === 'pattern' && (
                <p className={errorMessageClassName}> Email invalide</p>
              )}
            </div>
            <p>{emailValidation}</p>
            <button
              className={buttonClassName + ' bg-green-700 hover:bg-green-600'}
            >
              Valider
            </button>
          </form>
        </div>
      )
    ) : (
      // Reauthentication required to update user data
      <div className='update-form'>
        <p className='ps__form-subtitle'>
          Veuillez vous réauthentifier pour modifier votre email
        </p>
        <ReauthenticateForm setOpenUpdate={setOpenUpdate} />
      </div>
    )
  ) : (
    // If the user is not logged in, display nothing
    ''
  );
};

UpdateMail.propTypes = {
  setUpdateEmailOpen: PropTypes.func,
};

export default UpdateMail;
