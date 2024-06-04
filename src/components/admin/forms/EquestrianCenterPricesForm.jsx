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
 * React component for the equestrian center's prices form.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.equestrianCenterPrices
 * @param {Object} props.pensionPrices
 * @param {Function} props.setModalOpen
 * @param {Function} props.getPrices
 * @returns {JSX.Element}
 */
const EquestrianCenterPricesForm = ({
  equestrianCenterPrices,
  pensionPrices,
  getPrices,
  setModalOpen,
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
    const errorClasses = {
      period: errors[field] ? textareaErrorClassName : textareaClassName,
      infos: errors[field] ? textareaErrorClassName : textareaClassName,
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

  // Function for updating tariffs in the backend
  const updateFormPrices = async () => {
    const equestrianCenterDatas = {
      period: getValues('period'),
      infos: getValues('infos'),
      cardGroupLessons: {
        fiveHours: parseInt(getValues('hours5')),
        tenHours: parseInt(getValues('hours10')),
      },
      cardPrivatesLessons: {
        fiveClubLessons: parseInt(getValues('clubLesson5')),
        fiveOwnerLessons: parseInt(getValues('ownerLesson5')),
      },
      oneHourWeekly: {
        baby: parseInt(getValues('baby')),
        under18: parseInt(getValues('oneHourUnder18')),
        over18: parseInt(getValues('oneHourOver18')),
      },
      twoHoursWeekly: {
        baby: parseInt(getValues('baby')),
        under18: parseInt(getValues('twoHoursUnder18')),
        over18: parseInt(getValues('twoHoursOver18')),
      },
    };
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
    await updatePrices('equestrianCenter', equestrianCenterDatas);
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
      {/* ****************************PERIOD AND INFOS */}
      <FormSectionLayout
        fieldNames={['period', 'infos']}
        fieldValue={{
          period: equestrianCenterPrices['period'],
          infos: equestrianCenterPrices['infos'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

      {/* ****************************PACKAGE */}
      <h2 className={subtitleClassName}>Forfaits &lsquo;tout compris&rsquo;</h2>

      {/******* 1h/ week */}
      <h3 className='font-bold text-lg'>1h/ semaine</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={['baby', 'oneHourUnder18', 'oneHourOver18']}
        fieldValue={{
          baby: equestrianCenterPrices['oneHourWeekly']['baby'],
          oneHourUnder18: equestrianCenterPrices['oneHourWeekly']['under18'],
          oneHourOver18: equestrianCenterPrices['oneHourWeekly']['over18'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

      {/* ******* 2h/ week */}
      <h3 className='font-bold text-lg mt-6'>2h/ semaine</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={['twoHoursUnder18', 'twoHoursOver18']}
        fieldValue={{
          twoHoursUnder18: equestrianCenterPrices['twoHoursWeekly']['under18'],
          twoHoursOver18: equestrianCenterPrices['twoHoursWeekly']['over18'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

      {/* ****************************CARDS */}
      <h2 className={subtitleClassName}>Cartes</h2>

      {/******* group lessons */}
      <h3 className='font-bold text-lg'>Cours collectifs</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={['hours5', 'hours10']}
        fieldValue={{
          hours5: equestrianCenterPrices['cardGroupLessons']['fiveHours'],
          hours10: equestrianCenterPrices['cardGroupLessons']['tenHours'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

      {/******* private lessons */}
      <h3 className='font-bold text-lg mt-6'>Cours particuliers</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={['clubLesson5', 'ownerLesson5']}
        fieldValue={{
          clubLesson5:
            equestrianCenterPrices['cardPrivatesLessons']['fiveClubLessons'],
          ownerLesson5:
            equestrianCenterPrices['cardPrivatesLessons']['fiveOwnerLessons'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

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

EquestrianCenterPricesForm.propTypes = {
  equestrianCenterPrices: PropTypes.object.isRequired,
  pensionPrices: PropTypes.object.isRequired,
  getPrices: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};

export default EquestrianCenterPricesForm;
