/* eslint-disable react/no-unescaped-entities */
//**********************************************************
//Manage user's update password
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updatePassword } from 'firebase/auth';

const UpdatePassword = () => {
  const { currentUser } = useContext(UserContext);
  //display message for user
  const [pwValidation, setPwValidation] = useState('');
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
    newPassword: errors.newPassword ? 'Veuillez rentrer un mot de passe' : '',
    newPasswordConfirmation: errors.newPasswordConfirmation
      ? 'Veuillez rentrer un mot de passe identique'
      : '',
  };

  //update password
  const updateUserPassword = async () => {
    try {
      if (getValues('newPassword') === getValues('newPasswordConfirmation')) {
        await updatePassword(currentUser, getValues('newPassword'));
        setPwValidation('');
        setUpdateOkMessage(true);
      } else {
        setPwValidation('Les mots de passe de correspondent pas');
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
        <div>
          <p className='text-green-700'>Le mot de passe a été modifié.</p>
        </div>
      ) : (
        // When user is freshly reauthentificate :
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
                  Le mot de passe n'est pas valide
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
                  Le mot de passe n'est pas valide
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
      // Reauthentication needed for update user's data
      <div className='update-form'>
        <h2 className='title section__title'>Modifier votre mot de passe</h2>
        <p className='ps__form-subtitle'>
          Veuillez vous réauthentifier pour modifier votre mot de passe
        </p>
        <ReauthenticateForm setOpenUpdate={setOpenUpdate} />
      </div>
    )
  ) : (
    ''
  );
};
UpdatePassword.propTypes = {
  setUpdatePasswordOpen: PropTypes.func,
};
export default UpdatePassword;
