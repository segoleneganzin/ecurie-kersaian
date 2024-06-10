import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { updatePrices } from '../../../api/PricesApi';
import {
  subtitleClassName,
  separationClassName,
  formClassName,
  inputClassName,
  inputErrorClassName,
  textareaClassName,
  textareaErrorClassName,
  buttonClassName,
} from '../../../utils/GeneralClassNames';
import FormSectionLayout from '../../../layouts/FormSectionLayout';

/**
 * Form for managing pension prices.
 * @param {Object} props
 * @param {Object} props.pensionPrices
 * @param {Function} props.setModalOpen
 * @param {Function} props.getPrices
 * @returns {JSX.Element}
 */
const PensionPricesForm = ({ pensionPrices, setModalOpen, getPrices }) => {
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
    setModalOpen(false);
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
      <FormSectionLayout
        fieldNames={['halfPensionDescription', 'halfPensionTarif']}
        fieldValue={{
          halfPensionDescription: pensionPrices['halfPension']['description'],
          halfPensionTarif: pensionPrices['halfPension']['price'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

      {/******* one-third pension */}
      <h3 className='font-bold text-lg mt-6'>Tiers de pension</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={['thirdPartPensionDescription', 'thirdPartPensionTarif']}
        fieldValue={{
          thirdPartPensionDescription:
            pensionPrices['thirdPartPension']['description'],
          thirdPartPensionTarif: pensionPrices['thirdPartPension']['price'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />
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
  pensionPrices: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  getPrices: PropTypes.func.isRequired,
};

export default PensionPricesForm;
