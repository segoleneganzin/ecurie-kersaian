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
      annual: {
        oneHourWeekly: {
          baby: parseInt(getValues('annualBaby')),
          under18: parseInt(getValues('annualOneHourUnder18')),
          over18: parseInt(getValues('annualOneHourOver18')),
        },
        twoHoursWeekly: {
          under18: parseInt(getValues('annualTwoHoursUnder18')),
          over18: parseInt(getValues('annualTwoHoursOver18')),
        },
      },
      quarterly: {
        oneHourWeekly: {
          baby: parseInt(getValues('quarterlyBaby')),
          under18: parseInt(getValues('quarterlyOneHourUnder18')),
          over18: parseInt(getValues('quarterlyOneHourOver18')),
        },
        twoHoursWeekly: {
          under18: parseInt(getValues('quarterlyTwoHoursUnder18')),
          over18: parseInt(getValues('quarterlyTwoHoursOver18')),
        },
      },

      cardGroupLessons: {
        tenHours: {
          baby: parseInt(getValues('hours10Baby')),
          under18: parseInt(getValues('hours10Under18')),
          over18: parseInt(getValues('hours10Over18')),
        },
      },
      cardPrivatesLessons: {
        fiveClubLessons: {
          under18: parseInt(getValues('clubLesson5Under18')),
          over18: parseInt(getValues('clubLesson5Over18')),
        },
        fiveOwnerLessons: {
          under18: parseInt(getValues('ownerLesson5Under18')),
          over18: parseInt(getValues('ownerLesson5Over18')),
        },
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
      <h2 className={subtitleClassName}>Forfaits annuels</h2>

      {/******* 1h/ week */}
      <h3 className='font-bold text-lg'>1h/ semaine</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={[
          'annualBaby',
          'annualOneHourUnder18',
          'annualOneHourOver18',
        ]}
        fieldValue={{
          annualBaby: equestrianCenterPrices['annual']['oneHourWeekly']['baby'],
          annualOneHourUnder18:
            equestrianCenterPrices['annual']['oneHourWeekly']['under18'],
          annualOneHourOver18:
            equestrianCenterPrices['annual']['oneHourWeekly']['over18'],
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
        fieldNames={['annualTwoHoursUnder18', 'annualTwoHoursOver18']}
        fieldValue={{
          annualTwoHoursUnder18:
            equestrianCenterPrices['annual']['twoHoursWeekly']['under18'],
          annualTwoHoursOver18:
            equestrianCenterPrices['annual']['twoHoursWeekly']['over18'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

      <h2 className={subtitleClassName}>Forfaits trimestriels</h2>

      {/******* 1h/ week */}
      <h3 className='font-bold text-lg'>1h/ semaine</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={[
          'quarterlyBaby',
          'quarterlyOneHourUnder18',
          'quarterlyOneHourOver18',
        ]}
        fieldValue={{
          quarterlyBaby:
            equestrianCenterPrices['quarterly']['oneHourWeekly']['baby'],
          quarterlyOneHourUnder18:
            equestrianCenterPrices['quarterly']['oneHourWeekly']['under18'],
          quarterlyOneHourOver18:
            equestrianCenterPrices['quarterly']['oneHourWeekly']['over18'],
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
        fieldNames={['quarterlyTwoHoursUnder18', 'quarterlyTwoHoursOver18']}
        fieldValue={{
          quarterlyTwoHoursUnder18:
            equestrianCenterPrices['quarterly']['twoHoursWeekly']['under18'],
          quarterlyTwoHoursOver18:
            equestrianCenterPrices['quarterly']['twoHoursWeekly']['over18'],
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
      <h3 className='font-bold text-lg mt-6'>10 heures</h3>
      <div className={separationClassName}></div>

      <FormSectionLayout
        fieldNames={['hours10Baby', 'hours10Under18', 'hours10Over18']}
        fieldValue={{
          hours10Baby:
            equestrianCenterPrices['cardGroupLessons']['tenHours']['baby'],
          hours10Under18:
            equestrianCenterPrices['cardGroupLessons']['tenHours']['under18'],
          hours10Over18:
            equestrianCenterPrices['cardGroupLessons']['tenHours']['over18'],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />

      {/******* private lessons */}
      <h3 className='font-bold text-lg mt-6'>Cours particuliers</h3>
      <div className={separationClassName}></div>
      <h3 className='font-bold text-lg mt-6'>5 heures club</h3>
      <div className={separationClassName}></div>

      <FormSectionLayout
        fieldNames={['clubLesson5Under18', 'clubLesson5Over18']}
        fieldValue={{
          clubLesson5Under18:
            equestrianCenterPrices['cardPrivatesLessons']['fiveClubLessons'][
              'under18'
            ],
          clubLesson5Over18:
            equestrianCenterPrices['cardPrivatesLessons']['fiveClubLessons'][
              'over18'
            ],
        }}
        register={register}
        inputErrorClass={inputErrorClass}
        errors={errors}
        setValue={setValue}
      />
      <h3 className='font-bold text-lg mt-6'>5 heures propriétaire</h3>
      <div className={separationClassName}></div>
      <FormSectionLayout
        fieldNames={['ownerLesson5Under18', 'ownerLesson5Over18']}
        fieldValue={{
          ownerLesson5Under18:
            equestrianCenterPrices['cardPrivatesLessons']['fiveOwnerLessons'][
              'under18'
            ],
          ownerLesson5Over18:
            equestrianCenterPrices['cardPrivatesLessons']['fiveOwnerLessons'][
              'over18'
            ],
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
