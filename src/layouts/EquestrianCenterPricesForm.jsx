/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
const EquestrianCenterPricesForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      baby: 100,
      under18: 100,
      over18: 100,
      hours5: 100,
      hours10: 100,
      clubLesson5: 100,
      ownerLesson5: 100,
      halfPensionDescription: '1 cours par semaine + 2 monte libre',
      halfPensionTarif: 100,
      thirdPartPensionDescription: '1 cours par semaine + 1 monte libre',
      thirdPartPensionTarif: 100,
    },
  });

  const inputErrorClass = {
    baby: errors.baby ? 'border-b border-red-300' : 'border-b border-black',
    under18: errors.under18
      ? 'border-b border-red-300'
      : 'border-b border-black',
    over18: errors.over18 ? 'border-b border-red-300' : 'border-b border-black',
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
      : 'border-b border-black',
    halfPensionTarif: errors.halfPensionTarif
      ? 'border-b border-red-300'
      : 'border-b border-black',
    thirdPartPensionDescription: errors.thirdPartPensionDescription
      ? 'border-b border-red-300'
      : 'border-b border-black',
    thirdPartPensionTarif: errors.thirdPartPensionTarif
      ? 'border-b border-red-300'
      : 'border-b border-black',
  };
  const inputErrorMessage = {
    baby: errors.baby ? 'Veuillez renseigner un tarif' : '',
    under18: errors.under18 ? 'Veuillez renseigner un tarif' : '',
    over18: errors.over18 ? 'Veuillez renseigner un tarif' : '',
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
  return (
    <form
      onSubmit={handleSubmit(() => console.log('coucou'))}
      className='mt-2'
      noValidate
    >
      {/* ****************************FORFAITS */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Forfaits "tout compris"
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>
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
        <label className='pr-2 text-lg font-bold' htmlFor='under18'>
          - de 18ans :
        </label>
        <input
          id='under18'
          name='under18'
          type='number'
          className={inputErrorClass.under18}
          {...register('under18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.under18 && (
        <span className='text-red-800'>{inputErrorMessage.under18}</span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='over18'>
          + de 18ans :
        </label>
        <input
          id='over18'
          name='over18'
          type='number'
          className={inputErrorClass.over18}
          {...register('over18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.over18 && (
        <span className='text-red-800'>{inputErrorMessage.over18}</span>
      )}
      {/*******  2h/ semaine */}
      <h3 className='font-bold text-lg mt-6'>2h/ semaine</h3>
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
        <label className='pr-2 text-lg font-bold' htmlFor='under18'>
          - de 18ans :
        </label>
        <input
          id='under18'
          name='under18'
          type='number'
          className={inputErrorClass.under18}
          {...register('under18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.under18 && (
        <span className='text-red-800'>{inputErrorMessage.under18}</span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='over18'>
          + de 18ans :
        </label>
        <input
          id='over18'
          name='over18'
          type='number'
          className={inputErrorClass.over18}
          {...register('over18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.over18 && (
        <span className='text-red-800'>{inputErrorMessage.over18}</span>
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
      {/*******  demi pension */}
      <h3 className='font-bold text-lg mt-6'>Demi pension</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div>
        <label
          className='pr-2 text-lg font-bold'
          htmlFor='halfPensionDescription'
        >
          Description :
        </label>
        <input
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
      <div>
        <label
          className='pr-2 text-lg font-bold'
          htmlFor='thirdPartPensionDescription'
        >
          Description :
        </label>
        <input
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

export default EquestrianCenterPricesForm;
