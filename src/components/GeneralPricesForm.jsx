/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updatePrices } from '../api/PricesApi';
const GeneralPricesForm = ({ generalPrices, closeModal, getGeneralPrices }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const inputErrorClass = {
    annualSubscription: errors.annualSubscription
      ? 'border-b border-red-300'
      : 'border-b border-black',
    ffeLicenseUnder18: errors.ffeLicenseUnder18
      ? 'border-b border-red-300'
      : 'border-b border-black',
    ffeLicenseOver18: errors.ffeLicenseOver18
      ? 'border-b border-red-300'
      : 'border-b border-black',
  };
  const inputErrorMessage = {
    annualSubscription: errors.annualSubscription
      ? 'Veuillez renseigner un tarif'
      : '',
    ffeLicenseUnder18: errors.ffeLicenseUnder18
      ? 'Veuillez renseigner un tarif'
      : '',
    ffeLicenseOver18: errors.ffeLicenseOver18
      ? 'Veuillez renseigner un tarif'
      : '',
  };

  //**********************************************place data to input value
  const updateInputDatas = async () => {
    try {
      if (generalPrices) {
        setValue('annualSubscription', generalPrices['annualSubscription']);
        setValue('ffeLicenseUnder18', generalPrices['ffeLicense']['under18']);
        setValue('ffeLicenseOver18', generalPrices['ffeLicense']['over18']);
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
    const generalDatas = {
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
    <form onSubmit={handleSubmit(updateFormPrices)} className='mt-2' noValidate>
      {/* ****************************FORFAITS */}
      <h2 className='bg-principal-color text-center font-bold mt-8 text-white text-xl'>
        Tarifs généraux
      </h2>
      <div className='bg-principal-color h-2 mb-4 w-full'></div>
      {/*******  cotisation annuelle */}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='annualSubscription'>
          Cotisation annuelle :
        </label>
        <input
          id='annualSubscription'
          name='annualSubscription'
          type='number'
          className={inputErrorClass.annualSubscription}
          {...register('annualSubscription', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.annualSubscription && (
        <span className='text-red-800'>
          {inputErrorMessage.annualSubscription}
        </span>
      )}
      {/*******  Licence FFE */}
      <h3 className='font-bold text-lg mt-6'>Licence annuelle FFE</h3>
      <div className='bg-principal-color h-1 my-4 w-full'></div>
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='ffeLicenseUnder18'>
          - de 18ans :
        </label>
        <input
          id='ffeLicenseUnder18'
          name='ffeLicenseUnder18'
          type='number'
          className={inputErrorClass.ffeLicenseUnder18}
          {...register('ffeLicenseUnder18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.ffeLicenseUnder18 && (
        <span className='text-red-800'>
          {inputErrorMessage.ffeLicenseUnder18}
        </span>
      )}
      <div>
        <label className='pr-2 text-lg font-bold' htmlFor='ffeLicenseOver18'>
          + de 18ans :
        </label>
        <input
          id='ffeLicenseOver18'
          name='ffeLicenseOver18'
          type='number'
          className={inputErrorClass.ffeLicenseOver18}
          {...register('ffeLicenseOver18', { required: true })}
        />
        <span>€</span>
      </div>
      {errors.ffeLicenseOver18 && (
        <span className='text-red-800'>
          {inputErrorMessage.ffeLicenseOver18}
        </span>
      )}

      <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
          <button className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-base sm:leading-5'>
            Valider
          </button>
        </span>
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
