import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EquestrianCenterPricesForm from './admin/forms/EquestrianCenterPricesForm';
import GeneralPricesForm from './admin/forms/GeneralPricesForm';
import WeeklyPlannerForm from './admin/forms/WeeklyPlannerForm';
import HolidayWeeklyPlannerForm from './admin/forms/HolidayWeeklyPlannerForm';
import PensionPricesForm from './admin/forms/PensionPricesForm';
import UpdateLog from './admin/UpdateLog';
import { buttonClassName } from '../utils/GeneralClassNames';

/**
 * Modal component
 * use for all forms
 * @param {Object} props
 * @param {boolean} props.isModalOpen
 * @param {function} props.setModalOpen
 * @param {string} props.type - ('equestrianCenter', 'general', 'weeklyPlanner', 'holidayWeeklyPlanner', 'updateLog')
 * @param {Object} props.generalPrices necessary for 'general' type
 * @param {Object} props.equestrianCenterPrices - necessary for 'equestrianCenter' type
 * @param {Object} props.pensionPrices - necessary for 'equestrianCenter'
 * @param {function} props.getPrices - necessary for 'equestrianCenter' and 'general' types
 * @param {function} props.fetchPlanning - necessary for 'weeklyPlanner' and 'holidayWeeklyPlanner' types
 * @param {Array} props.schedule - necessary for 'weeklyPlanner' type
 * @param {Array} props.daysOfWeek - necessary for 'weeklyPlanner' type
 * @param {Array} props.timeSlots - necessary for 'weeklyPlanner' type
 * @param {Object} props.selectedTimeSlot - necessary for 'weeklyPlanner' type
 * @param {Object} props.selectedDay - necessary for 'weeklyPlanner' type
 * @param {string} props.period - necessary for 'weeklyPlanner' type
 * @param {string} props.holidayDateWeeklyPlanner - necessary for 'holidayWeeklyPlanner' type.
 * @param {function} props.setHolidayModalOpen - necessary for 'holidayWeeklyPlanner' type.
 * @returns {JSX.Element}
 */
const Modal = (props) => {
  const [deleteButton, setDeleteButton] = useState(null);
  const [title, setTitle] = useState(null);

  // ************** TITLE
  const displayTitle = () => {
    if (
      props.type === 'equestrianCenter' ||
      props.type === 'general' ||
      props.type === 'pension'
    ) {
      setTitle('Gestion des tarifs');
    } else if (
      props.type === 'weeklyPlanner' ||
      props.type === 'holidayWeeklyPlanner'
    ) {
      setTitle('Gestion des plannings');
    } else if (props.type === 'updateLog') {
      setTitle('Gestion du compte administrateur');
    }
  };

  // Updates title when modal type is changed
  // runs only once after initial rendering
  useEffect(() => {
    displayTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    props.setModalOpen(false);
  };

  return (
    <div
      className='fixed inset-0 z-40 overflow-y-auto'
      aria-hidden={!props.isModalOpen}
      aria-describedby='modalTitle'
      role='dialog'
    >
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' onClick={closeModal}>
          <span className='absolute inset-0 bg-gray-500 opacity-75'></span>
        </div>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full'>
          <div className='bg-white px-4 pt-5 pb-0 sm:p-6 sm:pb-4'>
            <div>
              <button
                className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:h-10 sm:w-10 sm:absolute sm:right-4 sm:top-4'
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
                {/* Specific forms for each type of modal */}
                {/* ************************ RIDING CENTER RATE FORM (packages + cards + half and third pension) */}
                {props.type === 'equestrianCenter' && (
                  <EquestrianCenterPricesForm
                    equestrianCenterPrices={props.equestrianCenterPrices}
                    pensionPrices={props.pensionPrices}
                    closeModal={closeModal}
                    getPrices={props.getPrices}
                  />
                )}
                {/* ************************ GENERAL PRICES FORM (annual subscription + license) */}
                {props.type === 'general' && (
                  <GeneralPricesForm
                    generalPrices={props.generalPrices}
                    closeModal={closeModal}
                    getGeneralPrices={props.getPrices}
                  />
                )}
                {/* ************************ PENSION RATE FORM (third, half, full) */}
                {props.type === 'pension' && (
                  <PensionPricesForm
                    pensionPrices={props.pensionPrices}
                    closeModal={closeModal}
                    getPrices={props.getPrices}
                  />
                )}

                {/* ************************ PLANNING FORM */}
                {props.type === 'weeklyPlanner' && (
                  <WeeklyPlannerForm
                    closeModal={closeModal}
                    fetchPlanning={props.fetchPlanning}
                    schedule={props.schedule}
                    daysOfWeek={props.daysOfWeek}
                    timeSlots={props.timeSlots}
                    selectedTimeSlot={props.selectedTimeSlot}
                    selectedDay={props.selectedDay}
                    period={props.period}
                    setDeleteButton={setDeleteButton}
                  />
                )}
                {/* ************************ VACATION PERIOD DATE FORM */}
                {props.type === 'holidayWeeklyPlanner' && (
                  <HolidayWeeklyPlannerForm
                    closeModal={closeModal}
                    holidayDateWeeklyPlanner={props.holidayDateWeeklyPlanner}
                    fetchPlanning={props.fetchPlanning}
                  />
                )}
                {/* ************************ ADMINISTRATOR PARAMETERS MANAGEMENT (mail/mdp/logout) */}
                {props.type === 'updateLog' && <UpdateLog />}
              </div>
            </div>
          </div>
          {/* Button section (e.g., Close, Cancel) */}
          <div className='bg-gray-50 px-4 py-3 sm:px-6 flex flex-col gap-2 justify-center'>
            {deleteButton}
            <button
              onClick={closeModal}
              type='button'
              className={
                buttonClassName + 'border-2 bg-blue-700 hover:bg-blue-500'
              }
            >
              {props.type === 'updateLog' ? 'Fermer' : 'Annuler'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isModalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  type: PropTypes.string,
  generalPrices: PropTypes.object,
  equestrianCenterPrices: PropTypes.object,
  pensionPrices: PropTypes.object,
  getPrices: PropTypes.func,
  fetchPlanning: PropTypes.func,
  schedule: PropTypes.arrayOf(PropTypes.object),
  daysOfWeek: PropTypes.arrayOf(PropTypes.string),
  timeSlots: PropTypes.arrayOf(PropTypes.string),
  selectedTimeSlot: PropTypes.object,
  selectedDay: PropTypes.object,
  period: PropTypes.string,
  holidayDateWeeklyPlanner: PropTypes.string,
  setHolidayModalOpen: PropTypes.func,
};

export default Modal;
