//**********************************************************
//Manage user's update email
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updateEmail } from 'firebase/auth';

/**
 * Composant React pour la gestion de la mise à jour de l'adresse e-mail de l'utilisateur.
 *
 * @component
 * @returns {JSX.Element} Le composant de gestion de la mise à jour de l'adresse e-mail.
 */
const UpdateMail = () => {
  // Utilisation du contexte utilisateur pour récupérer les informations actuelles de l'utilisateur
  const { currentUser } = useContext(UserContext);

  // État pour afficher un message à l'utilisateur
  const [emailValidation, setEmailValidation] = useState('');

  // État pour afficher un message de succès après la mise à jour
  const [updateOkMessage, setUpdateOkMessage] = useState(false);

  // État pour gérer l'accès à la mise à jour
  const [openUpdate, setOpenUpdate] = useState(false);

  // ************************************************************** CLASSNAMES
  const formClassName =
    'mt-4 mx-6 border-2 border-principal-color p-2 rounded-lg';
  const formDataContainerClassName = 'mb-4 flex flex-col';
  const labelClassName = 'pr-2 text-lg font-bold text-left';
  const inputClassName = 'border-b border-principal-color w-full';
  const inputErrorClassName = 'border-b border-red-300 w-full';
  const errorMessageClassName = 'text-red-500';
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
    newEmail: errors.newEmail ? 'Veuillez rentrer un email' : '',
  };

  /**
   * Fonction pour mettre à jour l'adresse e-mail de l'utilisateur.
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
      // Gestion des erreurs
      if (error.code === 'auth/email-already-in-use') {
        setEmailValidation('Cet email est déjà utilisé');
      }
      console.log(error);
    }
  };

  // Rendu du composant
  return currentUser ? (
    openUpdate ? (
      updateOkMessage ? (
        // Affichage du message de succès après la mise à jour
        <div>
          <p className='text-green-700 text-center'>
            L&apos;email a été modifié.
          </p>
        </div>
      ) : (
        // Affichage du formulaire de mise à jour de l'adresse e-mail
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
      // Reauthentication nécessaire pour mettre à jour les données de l'utilisateur
      <div className='update-form'>
        <p className='ps__form-subtitle'>
          Veuillez vous réauthentifier pour modifier votre email
        </p>
        <ReauthenticateForm setOpenUpdate={setOpenUpdate} />
      </div>
    )
  ) : (
    // Si l'utilisateur n'est pas connecté, ne rien afficher
    ''
  );
};

// Validation des types pour les propriétés du composant
UpdateMail.propTypes = {
  setUpdateEmailOpen: PropTypes.func,
};

export default UpdateMail;
