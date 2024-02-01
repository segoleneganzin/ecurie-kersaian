import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';

const ReauthenticateForm = (props) => {
  const { signIn, currentUser } = useContext(UserContext);
  const [validation, setValidation] = useState('');

  // ************** CLASSNAMES
  const formClassName =
    'mt-4 mx-6 border-2 border-principal-color p-2 rounded-lg';
  const formDataContainerClassName = 'mb-4 flex flex-col';
  const labelClassName = 'pr-2 text-lg font-bold text-left';
  const inputClassName = 'border-b border-principal-color w-full';
  const inputErrorClassName = 'border-b border-red-300 w-full';
  const errorMessageClassName = 'text-red-200';
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
    email: errors.email ? 'Veuillez rentrer votre email' : '',
    password: errors.password ? 'Veuillez rentrer votre mot de passe' : '',
  };

  //   reauthenticate for securise update
  const reauthenticate = async () => {
    if (getValues('email') === currentUser.email) {
      await signIn(
        getValues('email'),
        getValues('password'),
        setValidation,
        false
      );
      const isConnected = await signIn(
        getValues('email'),
        getValues('password'),
        setValidation,
        false
      );
      if (isConnected) {
        props.setOpenUpdate(true);
      }
    } else {
      setValidation('Votre email est erroné');
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
