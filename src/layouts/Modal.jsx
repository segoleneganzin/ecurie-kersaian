import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { buttonClassName } from '../utils/GeneralClassNames';

/**
 * Modal Layout
 * use for all forms
 * @param {Object} props
 * @param {boolean} props.isModalOpen
 * @param {function} props.setModalOpen
 * @param {string} props.title
 * @param {ReactNode} props.children
 * @returns {JSX.Element}
 */
const Modal = ({ isModalOpen, setModalOpen, title, children }) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup function to remove the class when the component is unmounted or modal is closed
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto sm:mt-12'
      aria-hidden={!isModalOpen}
      aria-describedby='modalTitle'
      role='dialog'
    >
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          onClick={closeModal}
        ></div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg'>
          <div className='bg-white px-4 pt-5 pb-0 sm:p-6 sm:pb-4'>
            <button
              className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full z-50 bg-green-100 sm:h-10 sm:w-10 sm:absolute sm:right-4 sm:top-4'
              onClick={closeModal}
              autoFocus
            >
              <svg
                className='h-6 w-6 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                {/* close icon */}
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </button>
            <div className='mt-3 text-center sm:mt-0  sm:text-left  w-full'>
              <h2
                className='text-lg font-bold leading-6 text-gray-900'
                id='modalTitle'
              >
                {title && title}
              </h2>
              {/* modal content */}
              {children}
            </div>
          </div>
          {/* Button section (e.g., Close, Cancel) */}
          <div className='px-4 py-3 sm:px-6 flex flex-col gap-2 justify-center'>
            <button
              onClick={closeModal}
              type='button'
              className={
                buttonClassName +
                'border-2 bg-blue-700 hover:bg-blue-500 w-full'
              }
            >
              {title === 'Gestion du compte administrateur'
                ? 'Fermer'
                : 'Annuler'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
