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
 * Composant React pour le formulaire de réauthentification.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.setOpenUpdate - La fonction pour gérer l'état de l'ouverture de la mise à jour.
 * @returns {JSX.Element} Le formulaire de réauthentification.
 */
const ReauthenticateForm = (props) => {
  // Utilisation du contexte utilisateur pour la fonction de connexion
  const { currentUser } = useContext(UserContext);

  // État pour gérer le message de validation en cas d'erreur
  const [validation, setValidation] = useState('');

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
    return errors[field]
      ? inputErrorClassName + ' min-w-52'
      : inputClassName + ' min-w-52';
  };

  // Messages d'erreur pour les champs du formulaire
  const inputErrorMessage = {
    email: errors.email ? 'Veuillez rentrer votre email' : '',
    password: errors.password ? 'Veuillez rentrer votre mot de passe' : '',
  };

  /**
   * Fonction pour la réauthentification et ouverture de la mise à jour.
   *
   * @async
   * @function
   * @throws {Error} Une erreur si la réauthentification échoue.
   */
  const reauthenticate = async () => {
    try {
      // Vérification si l'email saisi correspond à l'utilisateur actuel
      if (getValues('email') === currentUser.email) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          getValues('password')
        );
        reauthenticateWithCredential(currentUser, credential)
          .then(() => {
            // Si la connexion est réussie, ouvrir la mise à jour
            props.setOpenUpdate(true);
          })
          .catch((error) => {
            console.error('Erreur lors de la réauthentification', error);
          });
      } else {
        // Si l'email ne correspond pas à l'utilisateur actuel, afficher un message d'erreur
        setValidation('Votre email est erroné');
      }
    } catch (error) {
      // Gestion des erreurs
      console.error(error);
    }
  };

  // Rendu du formulaire de réauthentification
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

// Propriétés attendues par le composant
ReauthenticateForm.propTypes = {
  setOpenUpdate: PropTypes.func,
};

export default ReauthenticateForm;
