/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updatePrices } from '../api/PricesApi';
const EquestrianCenterPricesForm = ({
  equestrianCenterPrices,
  pensionPrices,
  closeModal,
  getPrices,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const inputErrorClass = {
    baby: errors.baby ? 'border-b border-red-300' : 'border-b border-black',
    oneHourUnder18: errors.oneHourUnder18
      ? 'border-b border-red-300'
      : 'border-b border-black',
    oneHourOver18: errors.oneHourOver18
      ? 'border-b border-red-300'
      : 'border-b border-black',
    twoHoursUnder18: errors.twoHoursUnder18
      ? 'border-b border-red-300'
      : 'border-b border-black',
    twoHoursOver18: errors.twoHoursOver18
      ? 'border-b border-red-300'
      : 'border-b border-black',
    hours5: errors.hours5 ? 'border-b border-red-300' : 'border-b border-black',
    hours10: errors.hours10
      ? 'border-b border-red-300'
      : 'border-b border-black',
    clubLesson5: errors.clubLesson5
      ? 'border-b border-red-300'
      : 'border-b border-black',
    ownerLesson5: errors.ownerLesson5
      ? 'border-b border-red-300'
      : 'border-b border-black',
    halfPensionDescription: errors.halfPensionDescription
      ? 'border-b border-red-300'
      : 'border border-black',
    halfPensionTarif: errors.halfPensionTarif
      ? 'border-b border-red-300'
      : 'border-b border-black',
    thirdPartPensionDescription: errors.thirdPartPensionDescription
      ? 'border-b border-red-300'
      : 'border border-black',
    thirdPartPensionTarif: errors.thirdPartPensionTarif
      ? 'border-b border-red-300'
      : 'border-b border-black',
  };
  const inputErrorMessage = {
    baby: errors.baby ? 'Veuillez renseigner un tarif' : '',
    oneHourUnder18: errors.oneHourUnder18 ? 'Veuillez renseigner un tarif' : '',
    oneHourOver18: errors.oneHourOver18 ? 'Veuillez renseigner un tarif' : '',
    twoHoursUnder18: errors.twoHoursUnder18
      ? 'Veuillez renseigner un tarif'
      : '',
    twoHoursOver18: errors.twoHoursOver18 ? 'Veuillez renseigner un tarif' : '',
    hours5: errors.hours5 ? 'Veuillez renseigner un tarif' : '',
    hours10: errors.hours10 ? 'Veuillez renseigner un tarif' : '',
    clubLesson5: errors.hours5 ? 'Veuillez renseigner un tarif' : '',
    ownerLesson5: errors.hours10 ? 'Veuillez renseigner un tarif' : '',
    halfPensionDescription: errors.halfPensionDescription
      ? 'Veuillez renseigner un tarif'
      : '',
    halfPensionTarif: errors.halfPensionTarif
      ? 'Veuillez renseigner un tarif'
      : '',
    thirdPartPensionDescription: errors.thirdPartPensionDescription
      ? 'Veuillez renseigner un tarif'
      : '',
    thirdPartPensionTarif: errors.thirdPartPensionTarif
      ? 'Veuillez renseigner un tarif'
      : '',
  };

  //**********************************************place data to input value
  const updateInputDatas = async () => {
    try {
      if (equestrianCenterPrices && pensionPrices) {
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
      cardGroupLessons: {
        fiveHours: getValues('hours5'),
        tenHours: getValues('hours10'),
      },
      cardPrivateLessons: {
        fiveClubLessons: getValues('clubLesson5'),
        fiveOwnerLessons: getValues('ownerLesson5'),
      },
      oneHourWeekly: {
        baby: getValues('baby'),
        under18: getValues('oneHourUnder18'),
        over18: getValues('oneHourOver18'),
      },
      twoHoursWeekly: {
        baby: getValues('baby'),
        under18: getValues('twoHoursUnder18'),
        over18: getValues('twoHoursOver18'),
      },
    };
    const pensionDatas = {
      halfPension: {
        description: getValues('halfPensionDescription'),
        price: getValues('halfPensionTarif'),
      },
      thirdPartPension: {
        description: getValues('thirdPartPensionDescription'),
        price: getValues('thirdPartPensionTarif'),
      },
    };
    await updatePrices('equestrianCenter', equestrianCenterDatas);
    await updatePrices('pension', pensionDatas);
    await getPrices();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(updateFormPrices)} className='mt-2' noValidate>
      {/* ****************************FORFAITS */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Forfaits "tout compris"
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>
      {/* TODO periode + complément d'info */}
      {/*******  1h/ semaine */}
      <h3 className='font-bold text-lg'>1h/ semaine</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='baby'>
          Baby :
        </label>
        <input
          id='baby'
          name='baby'
          type='number'
          className={inputErrorClass.baby}
          {...register('baby', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.baby && (
        <span className='text-red-800'>{inputErrorMessage.baby}</span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='oneHourUnder18'>
          - de 18ans :
        </label>
        <input
          id='oneHourUnder18'
          name='oneHourUnder18'
          type='number'
          className={inputErrorClass.oneHourUnder18}
          {...register('oneHourUnder18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.oneHourUnder18 && (
        <span className='text-red-800'>{inputErrorMessage.oneHourUnder18}</span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='oneHourOver18'>
          + de 18ans :
        </label>
        <input
          id='oneHourOver18'
          name='oneHourOver18'
          type='number'
          className={inputErrorClass.oneHourOver18}
          {...register('oneHourOver18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.oneHourOver18 && (
        <span className='text-red-800'>{inputErrorMessage.oneHourOver18}</span>
      )}
      {/*******  2h/ semaine */}
      <h3 className='font-bold text-lg mt-6'>2h/ semaine</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='twoHoursUnder18'>
          - de 18ans :
        </label>
        <input
          id='twoHoursUnder18'
          name='twoHoursUnder18'
          type='number'
          className={inputErrorClass.twoHoursUnder18}
          {...register('twoHoursUnder18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.twoHoursUnder18 && (
        <span className='text-red-800'>
          {inputErrorMessage.twoHoursUnder18}
        </span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='twoHoursOver18'>
          + de 18ans :
        </label>
        <input
          id='twoHoursOver18'
          name='twoHoursOver18'
          type='number'
          className={inputErrorClass.twoHoursOver18}
          {...register('twoHoursOver18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.twoHoursOver18 && (
        <span className='text-red-800'>{inputErrorMessage.twoHoursOver18}</span>
      )}
      {/* ****************************CARTES */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Cartes
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>
      {/*******  cours collectifs */}
      <h3 className='font-bold text-lg'>Cours collectifs</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='hours5'>
          5 heures :
        </label>
        <input
          id='hours5'
          name='hours5'
          type='number'
          className={inputErrorClass.hours5}
          {...register('hours5', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.hours5 && (
        <span className='text-red-800'>{inputErrorMessage.hours5}</span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='hours10'>
          10 heures :
        </label>
        <input
          id='hours10'
          name='hours10'
          type='number'
          className={inputErrorClass.hours10}
          {...register('hours10', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.hours10 && (
        <span className='text-red-800'>{inputErrorMessage.hours10}</span>
      )}
      {/*******  cours particuliers */}
      <h3 className='font-bold text-lg mt-6'>Cours particuliers</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='clubLesson5'>
          5 cours club :
        </label>
        <input
          id='clubLesson5'
          name='clubLesson5'
          type='number'
          className={inputErrorClass.clubLesson5}
          {...register('clubLesson5', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.clubLesson5 && (
        <span className='text-red-800'>{inputErrorMessage.clubLesson5}</span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='ownerLesson5'>
          5 cours propriétaire :
        </label>
        <input
          id='ownerLesson5'
          name='ownerLesson5'
          type='number'
          className={inputErrorClass.ownerLesson5}
          {...register('ownerLesson5', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.ownerLesson5 && (
        <span className='text-red-800'>{inputErrorMessage.ownerLesson5}</span>
      )}
      {/* ****************************DEMI ET TIERS DE PENSION */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Demi et tiers de pension
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>
      {/* TODO complément d'info */}
      {/*******  demi pension */}
      <h3 className='font-bold text-lg mt-6'>Demi pension</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div className='flex flex-col'>
        <label
          className='pr-2 text-lg font-bold'
          htmlFor='halfPensionDescription'
        >
          Description :
        </label>
        <textarea
          id='halfPensionDescription'
          name='halfPensionDescription'
          type='text'
          className={inputErrorClass.halfPensionDescription}
          {...register('halfPensionDescription', { required: true })}
        />
      </div>
      {errors.halfPensionDescription && (
        <span className='text-red-800'>
          {inputErrorMessage.halfPensionDescription}
        </span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='halfPensionTarif'>
          Tarif :
        </label>
        <input
          id='halfPensionTarif'
          name='halfPensionTarif'
          type='number'
          className={inputErrorClass.halfPensionTarif}
          {...register('halfPensionTarif', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.halfPensionTarif && (
        <span className='text-red-800'>
          {inputErrorMessage.halfPensionTarif}
        </span>
      )}
      {/*******  tiers de pension */}
      <h3 className='font-bold text-lg mt-6'>Tiers de pension</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div className='flex flex-col'>
        <label
          className='pr-2 text-lg font-bold'
          htmlFor='thirdPartPensionDescription'
        >
          Description :
        </label>
        <textarea
          id='thirdPartPensionDescription'
          name='thirdPartPensionDescription'
          type='text'
          className={inputErrorClass.thirdPartPensionDescription}
          {...register('thirdPartPensionDescription', { required: true })}
        />
      </div>
      {errors.thirdPartPensionDescription && (
        <span className='text-red-800'>
          {inputErrorMessage.thirdPartPensionDescription}
        </span>
      )}
      <div>
        <label
          className='pr-2 text-lg font-bold'
          htmlFor='thirdPartPensionTarif'
        >
          Tarif :
        </label>
        <input
          id='thirdPartPensionTarif'
          name='thirdPartPensionTarif'
          type='number'
          className={inputErrorClass.thirdPartPensionTarif}
          {...register('thirdPartPensionTarif', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.thirdPartPensionTarif && (
        <span className='text-red-800'>
          {inputErrorMessage.thirdPartPensionTarif}
        </span>
      )}
      <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
          <button className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'>
            Valider
          </button>
        </span>
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
