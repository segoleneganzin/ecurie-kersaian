import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { updatePrices } from '../../../api/PricesApi';
import {
  subtitleClassName,
  separationClassName,
  formClassName,
  inputClassName,
  inputErrorClassName,
  buttonClassName,
} from '../../../utils/GeneralClassNames';
import FormSectionLayout from '../../../layouts/FormSectionLayout';

/**
 * Form to manage general prices.
 * @param {Object} props
 * @param {Object} props.generalPrices
 * @param {Function} props.setModalOpen
 * @param {Function} props.getGeneralPrices
 * @returns {JSX.Element}
 */
const GeneralPricesForm = ({
  generalPrices,
  setModalOpen,
  getGeneralPrices,
}) => {
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
    setModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(updateFormPrices)}
      className={formClassName}
      noValidate
    >
      <FormSectionLayout
        fieldNames={['season']}
        fieldValue={{ season: generalPrices['season'] }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />
      {/* ****************************GENERAL */}
      <h2 className={subtitleClassName}>Tarifs généraux</h2>
      {/*******  annual subscription */}
      <FormSectionLayout
        fieldNames={['annualSubscription']}
        fieldValue={{ annualSubscription: generalPrices['annualSubscription'] }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />
      {/*******  FFE license */}
      <h3 className='font-bold text-lg mt-6'>Licence annuelle FFE</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={['ffeLicenseUnder18', 'ffeLicenseOver18']}
        fieldValue={{
          ffeLicenseOver18: generalPrices['ffeLicense']['over18'],
          ffeLicenseUnder18: generalPrices['ffeLicense']['under18'],
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

GeneralPricesForm.propTypes = {
  generalPrices: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  getGeneralPrices: PropTypes.func.isRequired,
};

export default GeneralPricesForm;
