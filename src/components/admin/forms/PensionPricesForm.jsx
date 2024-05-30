import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updatePrices } from '../../../api/PricesApi';
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
} from '../../../utils/GeneralClassNames';
/**
 * Form for managing pension prices.
 * @param {Object} props
 * @param {Object} props.generalPrices
 * @param {Function} props.closeModal
 * @param {Function} props.getGeneralPrices
 * @returns {JSX.Element}
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
   * Function to obtain the error class for a given field.
   * @param {string} field
   * @returns {string} - Field error class.
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
   * Function to obtain the error message for a given field.
   * @param {string} field
   * @returns {string} - Field error message
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
   * Updates form data with existing prices.
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Submits form data for update and closes the modal.
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
      {/* ****************************HALF AND ONE-THIRD pension */}
      <h2 className={subtitleClassName}>Demi et tiers de pension</h2>

      {/******* HALF pension */}
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
      </div>
      {errors.halfPensionTarif && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('halfPensionTarif')}
        </span>
      )}

      {/******* one-third pension */}
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
      </div>
      {errors.thirdPartPensionTarif && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('thirdPartPensionTarif')}
        </span>
      )}

      <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
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
