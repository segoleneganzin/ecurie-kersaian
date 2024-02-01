/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updatePrices } from '../../api/PricesApi';
const EquestrianCenterPricesForm = ({
  equestrianCenterPrices,
  pensionPrices,
  closeModal,
  getPrices,
}) => {
  // ************** GROUP CLASSNAMES
  const formClassName = 'mt-4 border-t-2 border-principal-color pt-2';
  const formDataContainerClassName = 'mb-4';
  const textareaContainerClassName = 'flex flex-col';
  const labelClassName = 'pr-2 text-lg font-bold';
  const inputClassName = 'border-b border-black max-w-12';
  const inputErrorClassName = 'border-b border-red-300';
  const textareaClassName = 'border border-black  pl-2';
  const textareaErrorClassName = 'border border-red-300';
  const errorMessageClassName = 'text-red-800';
  const buttonClassName =
    'm-auto w-fit rounded-md px-4 py-2 text-white shadow-sm transition ease-in-out duration-150 tracking-wide';
  //******************************* Gestion des erreurs dans le formulaire modal
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

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

  const inputErrorMessage = (field) => {
    const errorMessages = {
      period: errors[field] ? 'Veuillez renseigner une période' : '',
      infos: errors[field] ? '' : '',
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

  //**********************************************place data to input value
  const updateInputDatas = async () => {
    try {
      if (equestrianCenterPrices && pensionPrices) {
        setValue('period', equestrianCenterPrices['period']);
        setValue('infos', equestrianCenterPrices['infos']);
        setValue('baby', equestrianCenterPrices['oneHourWeekly']['baby']);
        setValue(
          'oneHourUnder18',
          equestrianCenterPrices['oneHourWeekly']['under18']
        );
        setValue(
          'oneHourOver18',
          equestrianCenterPrices['oneHourWeekly']['over18']
        );
        setValue(
          'twoHoursUnder18',
          equestrianCenterPrices['twoHoursWeekly']['under18']
        );
        setValue(
          'twoHoursOver18',
          equestrianCenterPrices['twoHoursWeekly']['over18']
        );
        setValue(
          'hours5',
          equestrianCenterPrices['cardGroupLessons']['fiveHours']
        );
        setValue(
          'hours10',
          equestrianCenterPrices['cardGroupLessons']['tenHours']
        );
        setValue(
          'clubLesson5',
          equestrianCenterPrices['cardPrivatesLessons']['fiveClubLessons']
        );
        setValue(
          'ownerLesson5',
          equestrianCenterPrices['cardPrivatesLessons']['fiveOwnerLessons']
        );
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
      console.log('Error getting cached document:', e);
    }
  };
  useEffect(() => {
    updateInputDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(updateFormPrices)}
      className={formClassName}
      noValidate
    >
      {/* ****************************PERIODE ET INFOS */}
      <div className={textareaContainerClassName}>
        <label className={labelClassName} htmlFor='period'>
          Période :
        </label>
        <textarea
          id='period'
          name='period'
          className={inputErrorClass('period')}
          {...register('period', { required: true })}
        />
      </div>
      {errors.period && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('period')}
        </span>
      )}
      <div className={textareaContainerClassName}>
        <label className={labelClassName} htmlFor='infos'>
          Informations diverses :
        </label>
        <textarea
          id='infos'
          name='infos'
          className={inputErrorClass('infos')}
          {...register('infos')}
        />
      </div>
      {errors.infos && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('infos')}
        </span>
      )}

      {/* ****************************FORFAITS */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Forfaits "tout compris"
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>

      {/******* 1h/ semaine */}
      <h3 className='font-bold text-lg'>1h/ semaine</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='baby'>
          Baby :
        </label>
        <input
          id='baby'
          name='baby'
          type='number'
          className={inputErrorClass('baby')}
          {...register('baby', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.baby && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('baby')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='oneHourUnder18'>
          - de 18ans :
        </label>
        <input
          id='oneHourUnder18'
          name='oneHourUnder18'
          type='number'
          className={inputErrorClass('oneHourUnder18')}
          {...register('oneHourUnder18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.oneHourUnder18 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('oneHourUnder18')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='oneHourOver18'>
          + de 18ans :
        </label>
        <input
          id='oneHourOver18'
          name='oneHourOver18'
          type='number'
          className={inputErrorClass('oneHourOver18')}
          {...register('oneHourOver18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.oneHourOver18 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('oneHourOver18')}
        </span>
      )}

      {/* ******* 2h/ semaine */}
      <h3 className='font-bold text-lg mt-6'>2h/ semaine</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='twoHoursUnder18'>
          - de 18ans :
        </label>
        <input
          id='twoHoursUnder18'
          name='twoHoursUnder18'
          type='number'
          className={inputErrorClass('twoHoursUnder18')}
          {...register('twoHoursUnder18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.twoHoursUnder18 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('twoHoursUnder18')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='twoHoursOver18'>
          + de 18ans :
        </label>
        <input
          id='twoHoursOver18'
          name='twoHoursOver18'
          type='number'
          className={inputErrorClass('twoHoursOver18')}
          {...register('twoHoursOver18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.twoHoursOver18 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('twoHoursOver18')}
        </span>
      )}

      {/* ****************************CARTES */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Cartes
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>

      {/******* cours collectifs */}
      <h3 className='font-bold text-lg'>Cours collectifs</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='hours5'>
          5 heures :
        </label>
        <input
          id='hours5'
          name='hours5'
          type='number'
          className={inputErrorClass('hours5')}
          {...register('hours5', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.hours5 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('hours5')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='hours10'>
          10 heures :
        </label>
        <input
          id='hours10'
          name='hours10'
          type='number'
          className={inputErrorClass('hours10')}
          {...register('hours10', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.hours10 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('hours10')}
        </span>
      )}

      {/******* cours particuliers */}
      <h3 className='font-bold text-lg mt-6'>Cours particuliers</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='clubLesson5'>
          5 cours club :
        </label>
        <input
          id='clubLesson5'
          name='clubLesson5'
          type='number'
          className={inputErrorClass('clubLesson5')}
          {...register('clubLesson5', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.clubLesson5 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('clubLesson5')}
        </span>
      )}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='ownerLesson5'>
          5 cours propriétaire :
        </label>
        <input
          id='ownerLesson5'
          name='ownerLesson5'
          type='number'
          className={inputErrorClass('ownerLesson5')}
          {...register('ownerLesson5', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.ownerLesson5 && (
        <span className={errorMessageClassName}>
          {inputErrorMessage('ownerLesson5')}
        </span>
      )}

      {/* ****************************DEMI ET TIERS DE PENSION */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Demi et tiers de pension
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>

      {/******* demi pension */}
      <h3 className='font-bold text-lg mt-6'>Demi pension</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
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
      <div className='bg-principal-color h-1 my-4 w-full'></div>
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
EquestrianCenterPricesForm.propTypes = {
  generalPrices: PropTypes.object,
  equestrianCenterPrices: PropTypes.object,
  pensionPrices: PropTypes.object,
  closeModal: PropTypes.func,
  getPrices: PropTypes.func,
};
export default EquestrianCenterPricesForm;
