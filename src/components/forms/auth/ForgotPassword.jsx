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
 * Composant React pour la réinitialisation du mot de passe.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.setForgotPassword - La fonction pour gérer l'état du composant parent.
 * @returns {JSX.Element} Le composant de réinitialisation du mot de passe.
 */
function ForgotPassword(props) {
  // État pour gérer l'affichage du message de succès après envoi de l'email de réinitialisation
  const [emailMessage, setEmailMessage] = useState(false);

  // État pour gérer le message de validation en cas d'erreur
  const [validation, setValidation] = useState('');

  // Utilisation de react-hook-form pour gérer le formulaire
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  /**
   * Fonction pour obtenir la classe d'erreur pour un champ donné.
   * @param {string} field - Nom du champ.
   * @returns {string} - Classe d'erreur du champ.
   */
  const inputErrorClass = (field) => {
    return errors[field]
      ? inputErrorClassName + ' min-w-52'
      : inputClassName + ' min-w-52';
  };

  // Messages d'erreur pour les champs du formulaire
  const inputErrorMessage = {
    email: errors.email ? 'Veuillez rentrer votre email' : '',
  };

  // Fonction pour envoyer une demande de réinitialisation de mot de passe via Firebase
  const passwordReset = async (email) => {
    return await sendPasswordResetEmail(auth, email);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleForm = async () => {
    try {
      // Appel à la fonction passwordReset pour envoyer l'email de réinitialisation
      await passwordReset(getValues('email'));

      // Affichage du message de succès
      setEmailMessage(true);
    } catch (error) {
      // Gestion des erreurs
      if (error.code === 'auth/user-not-found') {
        setValidation('Utilisateur inconnu');
        setValue('email', ''); // Réinitialisation du champ email
      }
    }
  };

  // Rendu conditionnel en fonction de l'état emailMessage
  return emailMessage ? (
    // Affichage du message de succès après l'envoi de l'email
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
    // Affichage du formulaire de réinitialisation du mot de passe
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

// Propriétés attendues par le composant
ForgotPassword.propTypes = {
  setForgotPassword: PropTypes.func,
};

export default ForgotPassword;
