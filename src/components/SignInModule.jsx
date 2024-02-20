//****************************************************************************
//For admin's logged in
//****************************************************************************
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import ForgotPassword from './forms/auth/ForgotPassword';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.webp';
import {
  formClassName,
  labelClassName,
  formDataContainerClassName,
  inputClassName,
  inputErrorClassName,
  errorMessageClassName,
  buttonClassName,
} from '../utils/GeneralClassNames';

/**
 * React component for the administrator login module.
 *
 * @component
 * @returns {JSX.Element}
 */
const SignInModule = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(UserContext);
  const [validation, setValidation] = useState('');
  // Status to manage display of ForgotPassword component
  const [forgotPassword, setForgotPassword] = useState(false);

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
   * Function to manage the submission of the connection form.
   *
   * @function
   * @throws {Error}
   */
  const handleForm = () => {
    try {
      signIn(getValues('email'), getValues('password'), setValidation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='font-inconsolata min-h-screen bg-principal-color '>
      <header className='flex flex-col gap-4 items-center justify-between pb-12 lg:pt-12 lg:flex-row lg:pr-12 font-inconsolata'>
        <div className='flex flex-col justify-center items-center pb-6 lg:flex-row lg:gap-20 lg:pb-0'>
          <img
            src={logo}
            alt='Logo du site'
            className='w-64 lg:ml-12'
            width={256}
            height={188}
          />
          <h1 className='text-xl text-white tracking-widest text-center lg:text-left lg:text-3xl w-fit'>
            Connexion à la page d&apos;administration
          </h1>
        </div>
      </header>
      <main className='min-h-dvh text-principal-color overflow-x-hidden font-inconsolata 2xl:max-w-screen-xl 2xl:m-auto'>
        {forgotPassword ? (
          // ForgotPassword component displayed if forgotPassword status is true
          <ForgotPassword setForgotPassword={setForgotPassword} />
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
                  <p className={errorMessageClassName}>
                    {inputErrorMessage.email}
                  </p>
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
                className={
                  buttonClassName +
                  ' bg-green-700 hover:bg-green-600 flex justify-center'
                }
              >
                Connexion
              </button>
            </form>
            <div className='flex flex-col gap-4 mt-4 items-center'>
              <a
                href='#'
                onClick={() => setForgotPassword(true)}
                className='text-white cursor-pointer'
              >
                Mot de passe oublié ?
              </a>
              <a
                onClick={() => navigate('/')}
                className='text-white cursor-pointer'
              >
                Aller sur le site
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SignInModule;
