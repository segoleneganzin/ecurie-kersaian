/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */

//****************************************************************************
//For admin's logged in
//****************************************************************************
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import ForgotPassword from './ForgotPassword';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.webp';

/**
 * Composant React pour le module de connexion pour les administrateurs.
 *
 * @component
 * @returns {JSX.Element} Le formulaire de connexion pour les administrateurs.
 */
const SignInModule = () => {
  // Utilisation de useNavigate pour la navigation
  const navigate = useNavigate();

  // Utilisation du contexte utilisateur pour la fonction de connexion
  const { signIn } = useContext(UserContext);

  // État pour gérer le message de validation en cas d'erreur
  const [validation, setValidation] = useState('');

  // État pour gérer l'affichage du composant ForgotPassword
  const [forgotPassword, setForgotPassword] = useState(false);

  // ************************************************************** CLASSNAMES
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
  // ********************************************************************

  // Utilisation de react-hook-form pour gérer le formulaire
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  /**
   * Fonction pour obtenir la classe d'erreur pour un champ donné.
   * @param {string} field - Nom du champ.
   * @returns {string} - Classe d'erreur du champ.
   */
  const inputErrorClass = (field) => {
    return errors[field] ? inputErrorClassName : inputClassName;
  };

  // Messages d'erreur pour les champs du formulaire
  const inputErrorMessage = {
    email: errors.email ? 'Veuillez rentrer votre email' : '',
    password: errors.password ? 'Veuillez rentrer votre mot de passe' : '',
  };

  /**
   * Fonction pour gérer la soumission du formulaire de connexion.
   *
   * @function
   * @throws {Error} Une erreur si la connexion échoue.
   */
  const handleForm = () => {
    try {
      // Appel à la fonction signIn pour tenter la connexion
      signIn(getValues('email'), getValues('password'), setValidation);
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
    }
  };

  // Rendu du composant
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
            Connexion à la page d'administration
          </h1>
        </div>
      </header>
      <main className='min-h-dvh text-principal-color overflow-x-hidden font-inconsolata 2xl:max-w-screen-xl 2xl:m-auto'>
        {forgotPassword ? (
          // Affichage du composant ForgotPassword si l'état forgotPassword est vrai
          <ForgotPassword setForgotPassword={setForgotPassword} />
        ) : (
          <div>
            <form
              onSubmit={handleSubmit(handleForm)}
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
                className={buttonClassName + ' bg-green-700 hover:bg-green-600'}
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
