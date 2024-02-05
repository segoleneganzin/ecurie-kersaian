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
  textareaContainerClassName,
  textareaClassName,
  textareaErrorClassName,
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
const PensionPricesForm = ({ pensionPrices, closeModal, getPrices }) => {
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
    const errorClasses = {
      halfPensionDescription: errors[field]
        ? textareaErrorClassName
        : textareaClassName,
      thirdPartPensionDescription: errors[field]
        ? textareaErrorClassName
        : textareaClassName,

      default: errors[field] ? inputErrorClassName : inputClassName,
    };
    return errorClasses[field] || errorClasses.default;
  };

  /**
   * Fonction pour obtenir le message d'erreur pour un champ donné.
   * @param {string} field - Nom du champ.
   * @returns {string} - Message d'erreur du champ.
   */
  const inputErrorMessage = (field) => {
    const errorMessages = {
      halfPensionDescription: errors[field]
        ? 'Veuillez renseigner une description'
        : '',
      thirdPartPensionDescription: errors[field]
        ? 'Veuillez renseigner une description'
        : '',

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
      if (pensionPrices) {
        setValue(
          'halfPensionDescription',
          pensionPrices['halfPension']['description']
        );
        setValue('halfPensionTarif', pensionPrices['halfPension']['price']);
        setValue(
          'thirdPartPensionDescription',
          pensionPrices['thirdPartPension']['description']
        );
        setValue(
          'thirdPartPensionTarif',
          pensionPrices['thirdPartPension']['price']
        );
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
  });

  /**
   * Fonction pour mettre à jour les tarifs généraux.
   * Soumet les données du formulaire pour mise à jour et ferme le modal.
   */
  const updateFormPrices = async () => {
    const pensionDatas = {
      halfPension: {
        description: getValues('halfPensionDescription'),
        price: parseInt(getValues('halfPensionTarif')),
      },
      thirdPartPension: {
        description: getValues('thirdPartPensionDescription'),
        price: parseInt(getValues('thirdPartPensionTarif')),
      },
    };
    await updatePrices('pension', pensionDatas);
    await getPrices();
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(updateFormPrices)}
      className={formClassName}
      noValidate
    >
      {/* ****************************DEMI ET TIERS DE PENSION */}
      <h2 className={subtitleClassName}>Demi et tiers de pension</h2>

      {/******* demi pension */}
      <h3 className='font-bold text-lg mt-6'>Demi pension</h3>
      <div className={separationClassName}></div>
      <div className={textareaContainerClassName}>
        <label className={labelClassName} htmlFor='halfPensionDescription'>
          Description :
        </label>
        <textarea
          id='halfPensionDescription'
          name='halfPensionDescription'
          type='text'
          className={inputErrorClass('halfPensionDescription')}
          {...register('halfPensionDescription', { required: true })}
        />
      </div>
      {errors.halfPensionDescription && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('halfPensionDescription')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='halfPensionTarif'>
          Tarif :
        </label>
        <input
          id='halfPensionTarif'
          name='halfPensionTarif'
          type='number'
          className={inputErrorClass('halfPensionTarif')}
          {...register('halfPensionTarif', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.halfPensionTarif && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('halfPensionTarif')}
        </span>
      )}

      {/******* tiers de pension */}
      <h3 className='font-bold text-lg mt-6'>Tiers de pension</h3>
      <div className={separationClassName}></div>
      <div className={textareaContainerClassName}>
        <label className={labelClassName} htmlFor='thirdPartPensionDescription'>
          Description :
        </label>
        <textarea
          id='thirdPartPensionDescription'
          name='thirdPartPensionDescription'
          type='text'
          className={inputErrorClass('thirdPartPensionDescription')}
          {...register('thirdPartPensionDescription', { required: true })}
        />
      </div>
      {errors.thirdPartPensionDescription && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('thirdPartPensionDescription')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='thirdPartPensionTarif'>
          Tarif :
        </label>
        <input
          id='thirdPartPensionTarif'
          name='thirdPartPensionTarif'
          type='number'
          className={inputErrorClass('thirdPartPensionTarif')}
          {...register('thirdPartPensionTarif', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.thirdPartPensionTarif && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('thirdPartPensionTarif')}
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

PensionPricesForm.propTypes = {
  pensionPrices: PropTypes.object,
  closeModal: PropTypes.func,
  getPrices: PropTypes.func,
};

export default PensionPricesForm;
