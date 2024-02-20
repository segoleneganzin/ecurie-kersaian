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
 * Form to manage general rates.
 * @param {Object} props
 * @param {Object} props.generalPrices
 * @param {Function} props.closeModal
 * @param {Function} props.getGeneralPrices
 * @returns {JSX.Element}
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
   * Function to obtain the error class for a given field.
   * @param {string} field
   * @returns {string} - Field error class.
   */
  const inputErrorClass = (field) => {
    return errors[field] ? inputErrorClassName : inputClassName;
  };

  /**
   * Function to obtain the error message for a given field.
   * @param {string} field
   * @returns {string} - Field error message
   */
  const inputErrorMessage = (field) => {
    const errorMessages = {
      season: errors[field] ? 'Veuillez renseigner la saison' : '',
      default: errors[field] ? 'Veuillez renseigner un tarif' : '',
    };
    return errorMessages[field] || errorMessages.default;
  };

  /**
   * Updates form data with existing general rates.   */
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
   * Update general prices backend
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
      {/*******  annual subscription */}
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
      {/*******  FFE license */}
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
