import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updatePrices } from '../../api/PricesApi';
import {
  subtitleClassName,
  separationClassName,
  formClassName,
  labelClassName,
  formDataContainerClassName,
  inputClassName,
  inputErrorClassName,
  errorMessageClassName,
  buttonClassName,
} from '../../utils/GeneralClassNames';

/**
 * Formulaire pour la gestion des tarifs généraux.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.generalPrices - Les tarifs généraux existants.
 * @param {Function} props.closeModal - Fonction pour fermer le modal.
 * @param {Function} props.getGeneralPrices - Fonction pour récupérer les tarifs généraux mis à jour.
 * @returns {JSX.Element} - Élément de formulaire React.
 */
const GeneralPricesForm = ({ generalPrices, closeModal, getGeneralPrices }) => {
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
    return errors[field] ? inputErrorClassName : inputClassName;
  };

  /**
   * Fonction pour obtenir le message d'erreur pour un champ donné.
   * @param {string} field - Nom du champ.
   * @returns {string} - Message d'erreur du champ.
   */
  const inputErrorMessage = (field) => {
    const errorMessages = {
      season: errors[field] ? 'Veuillez renseigner la saison' : '',
      default: errors[field] ? 'Veuillez renseigner un tarif' : '',
    };
    return errorMessages[field] || errorMessages.default;
  };

  /**
   * Gestion des données du formulaire.
   * Met à jour les données du formulaire avec les tarifs généraux existants.
   */
  const updateInputDatas = async () => {
    try {
      if (generalPrices) {
        setValue('season', generalPrices['season']);
        setValue('annualSubscription', generalPrices['annualSubscription']);
        setValue('ffeLicenseUnder18', generalPrices['ffeLicense']['under18']);
        setValue('ffeLicenseOver18', generalPrices['ffeLicense']['over18']);
      }
    } catch (e) {
      console.log(
        'Erreur lors de la récupération du document mis en cache :',
        e
      );
    }
  };

  useEffect(() => {
    updateInputDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fonction pour mettre à jour les tarifs généraux.
   * Soumet les données du formulaire pour mise à jour et ferme le modal.
   */
  const updateFormPrices = async () => {
    const generalDatas = {
      season: getValues('season'),
      annualSubscription: parseInt(getValues('annualSubscription')),
      ffeLicense: {
        under18: parseInt(getValues('ffeLicenseUnder18')),
        over18: parseInt(getValues('ffeLicenseOver18')),
      },
    };
    await updatePrices('general', generalDatas);
    await getGeneralPrices();
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(updateFormPrices)}
      className={formClassName}
      noValidate
    >
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='season'>
          Saison :
        </label>
        <input
          id='season'
          name='season'
          type='text'
          className={inputErrorClass('season') + 'w-20'}
          {...register('season', { required: true })}
        />
      </div>
      {errors.season && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('season')}
        </span>
      )}
      {/* ****************************GENERAL */}
      <h2 className={subtitleClassName}>Tarifs généraux</h2>
      {/*******  cotisation annuelle */}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='annualSubscription'>
          Cotisation annuelle :
        </label>
        <input
          id='annualSubscription'
          name='annualSubscription'
          type='number'
          className={inputErrorClass('annualSubscription')}
          {...register('annualSubscription', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.annualSubscription && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('annualSubscription')}
        </span>
      )}
      {/*******  Licence FFE */}
      <h3 className='font-bold text-lg mt-6'>Licence annuelle FFE</h3>
      <div className={separationClassName}></div>
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='ffeLicenseUnder18'>
          - de 18ans :
        </label>
        <input
          id='ffeLicenseUnder18'
          name='ffeLicenseUnder18'
          type='number'
          className={inputErrorClass('ffeLicenseUnder18')}
          {...register('ffeLicenseUnder18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.ffeLicenseUnder18 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('ffeLicenseUnder18')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='ffeLicenseOver18'>
          + de 18ans :
        </label>
        <input
          id='ffeLicenseOver18'
          name='ffeLicenseOver18'
          type='number'
          className={inputErrorClass('ffeLicenseOver18')}
          {...register('ffeLicenseOver18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.ffeLicenseOver18 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('ffeLicenseOver18')}
        </span>
      )}

      <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <button
          className={buttonClassName + ' bg-green-700 hover:bg-green-500'}
        >
          Valider
        </button>
      </div>
    </form>
  );
};

GeneralPricesForm.propTypes = {
  generalPrices: PropTypes.object,
  closeModal: PropTypes.func,
  getGeneralPrices: PropTypes.func,
};

export default GeneralPricesForm;
