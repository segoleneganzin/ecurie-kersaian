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
      annualSubscription: {
        baby: parseInt(getValues('annualSubscriptionBaby')),
        under18: parseInt(getValues('annualSubscriptionUnder18')),
        over18: parseInt(getValues('annualSubscriptionOver18')),
      },
      ffeLicense: {
        under18: parseInt(getValues('ffeLicenseUnder18')),
        over18: parseInt(getValues('ffeLicenseOver18')),
      },
      trialLesson: {
        baby: parseInt(getValues('trialLessonBaby')),
        under18: parseInt(getValues('trialLessonUnder18')),
        over18: parseInt(getValues('trialLessonOver18')),
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
      <h3 className='font-bold text-lg mt-6'>Adhésion au club :</h3>
      <div className={separationClassName}></div>
      {/*******  annual subscription */}
      <FormSectionLayout
        fieldNames={[
          'annualSubscriptionBaby',
          'annualSubscriptionUnder18',
          'annualSubscriptionOver18',
        ]}
        fieldValue={{
          annualSubscriptionBaby: generalPrices['annualSubscription']['baby'],
          annualSubscriptionUnder18:
            generalPrices['annualSubscription']['under18'],
          annualSubscriptionOver18:
            generalPrices['annualSubscription']['over18'],
        }}
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
          ffeLicenseUnder18: generalPrices['ffeLicense']['under18'],
          ffeLicenseOver18: generalPrices['ffeLicense']['over18'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />
      {/*******  tial lesson */}
      <h3 className='font-bold text-lg mt-6'>Cours d&apos;essai :</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={[
          'trialLessonBaby',
          'trialLessonUnder18',
          'trialLessonOver18',
        ]}
        fieldValue={{
          trialLessonBaby: generalPrices['trialLesson']['baby'],
          trialLessonUnder18: generalPrices['trialLesson']['under18'],
          trialLessonOver18: generalPrices['trialLesson']['over18'],
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
