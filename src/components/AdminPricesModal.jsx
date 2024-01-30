/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import EquestrianCenterPricesForm from '../layouts/EquestrianCenterPricesForm';

const AdminPricesModal = ({ setModalOpen, type }) => {
  //******************************* Gestion des erreurs dans le formulaire modal
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      duration: 60,
      title: 'test',
      cellBg: '#000000',
    },
  });

  const inputErrorClass = {
    duration: errors.duration ? 'border border-red-300' : 'border border-black',
    title: errors.title ? 'border border-red-300' : 'border border-black',
    cellBg: errors.cellBg ? 'border border-red-300' : 'border border-black',
  };
  const inputErrorMessage = {
    duration: errors.duration ? 'Veuillez renseigner une durée' : '',
    title: errors.title ? 'Veuillez renseigner un intitulé' : '',
    cellBg: errors.cellBg ? 'Veuillez renseigner une couleur de fond' : '',
  };

  const closeModal = () => {
    setModalOpen(false);
    // // Réinitialisation des valeurs
    // setState({
    //   day: null,
    //   timeSlot: null,
    //   available: true,
    //   duration: 60,
    //   title: null,
    //   startTime: null,
    //   endTime: null,
    //   cellBg: null,
    // });
  };

  return (
    <div className='fixed inset-0 z-40 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' onClick={closeModal}>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div
                className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'
                onClick={closeModal}
              >
                {/* Icone du modal */}
                <svg
                  className='h-6 w-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  {/* Icône de fermeture */}
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900'
                  id='modal-title'
                >
                  Modifier les tarifs
                </h3>
                {type === 'equestrianCenter' ? (
                  <EquestrianCenterPricesForm />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
              <button
                onClick={closeModal}
                type='button'
                className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
              >
                Annuler
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
AdminPricesModal.propTypes = {
  setModalOpen: PropTypes.func,
  type: PropTypes.string,
};
export default AdminPricesModal;
