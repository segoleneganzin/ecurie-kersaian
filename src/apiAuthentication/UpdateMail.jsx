/* eslint-disable react/no-unescaped-entities */
//**********************************************************
//Manage user's update email
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updateEmail } from 'firebase/auth';

const UpdateMail = () => {
  const { currentUser } = useContext(UserContext);
  //display message for user
  const [emailValidation, setEmailValidation] = useState('');
  const [updateOkMessage, setUpdateOkMessage] = useState(false);
  //manage acces to update
  const [openUpdate, setOpenUpdate] = useState(false);
  // ************** CLASSNAMES
  const formClassName =
    'mt-4 mx-6 border-2 border-principal-color p-2 rounded-lg';
  const formDataContainerClassName = 'mb-4 flex flex-col';
  const labelClassName = 'pr-2 text-lg font-bold text-left';
  const inputClassName = 'border-b border-principal-color w-full';
  const inputErrorClassName = 'border-b border-red-300 w-full';
  const errorMessageClassName = 'text-red-500';
  const buttonClassName =
    'm-auto flex justify-center w-fit rounded-md px-4 py-2 text-white shadow-sm transition ease-in-out duration-150 tracking-wider';

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const inputErrorClass = (field) => {
    return errors[field] ? inputErrorClassName : inputClassName;
  };
  const inputErrorMessage = {
    newEmail: errors.newEmail ? 'Veuillez rentrer un email' : '',
  };

  //update email
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
        <div>
          <p className='text-green-700'>L'email a été modifié.</p>
        </div>
      ) : (
        // When user is freshly reauthentificate :
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
      // Reauthentication needed for update user's data
      <div className='update-form'>
        <p className='ps__form-subtitle'>
          Veuillez vous réauthentifier pour modifier votre email
        </p>
        <ReauthenticateForm setOpenUpdate={setOpenUpdate} />
      </div>
    )
  ) : (
    ''
  );
};
UpdateMail.propTypes = {
  setUpdateEmailOpen: PropTypes.func,
};
export default UpdateMail;
