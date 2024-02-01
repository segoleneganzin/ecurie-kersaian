import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EquestrianCenterPricesForm from './forms/EquestrianCenterPricesForm';
import GeneralPricesForm from './forms/GeneralPricesForm';
import WeeklyPlannerForm from './forms/WeeklyPlannerForm';
import HolidayWeeklyPlannerForm from './forms/HolidayWeeklyPlannerForm';
import UpdateLog from '../apiAuthentication/UpdateLog';

const Modal = (props) => {
  const [deleteButton, setDeleteButton] = useState(null);
  const [title, setTitle] = useState(null);
  // ************** CLASSNAMES
  const buttonClassName =
    'm-auto w-fit rounded-md px-4 py-2 text-white shadow-sm transition ease-in-out duration-150 tracking-wide';

  // ************** TITRE
  const displayTitle = () => {
    switch (props.type) {
      case 'equestrianCenter':
        setTitle('Gestion des tarifs');
        break;
      case 'general':
        setTitle('Gestion des tarifs');
        break;
      case 'weeklyPlanner':
        setTitle('Gestion des plannings');
        break;
      case 'holidayWeeklyPlanner':
        setTitle('Gestion des plannings'); // gestion des dates de vacances
        break;
      case 'updateLog':
        setTitle('Gestion des paramètres de connexion'); // gestion des dates de vacances
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    displayTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Le tableau de dépendances vide signifie que cela s'exécute seulement une fois après le rendu initial

  // ************** CLOSE MODALE
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
              </button>
              <div className='mt-3 text-center sm:mt-0  sm:text-left  w-full'>
                <h3
                  className='text-lg font-bold leading-6 text-gray-900'
                  id='modalTitle'
                >
                  {title && title}
                </h3>
                {props.type === 'equestrianCenter' && (
                  <EquestrianCenterPricesForm
                    equestrianCenterPrices={props.equestrianCenterPrices}
                    pensionPrices={props.pensionPrices}
                    closeModal={closeModal}
                    getPrices={props.getPrices}
                  />
                )}
                {props.type === 'general' && (
                  <GeneralPricesForm
                    generalPrices={props.generalPrices}
                    closeModal={closeModal}
                    getGeneralPrices={props.getPrices}
                  />
                )}
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
                {props.type === 'holidayWeeklyPlanner' && (
                  <HolidayWeeklyPlannerForm
                    closeModal={closeModal}
                    holidayDateWeeklyPlanner={props.holidayDateWeeklyPlanner}
                    fetchPlanning={props.fetchPlanning}
                  />
                )}
                {props.type === 'updateLog' && <UpdateLog />}
              </div>
            </div>
          </div>
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
  isModalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  generalPrices: PropTypes.object.isRequired,
  equestrianCenterPrices: PropTypes.object.isRequired,
  pensionPrices: PropTypes.object.isRequired,
  getPrices: PropTypes.func.isRequired,
  fetchPlanning: PropTypes.func.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  daysOfWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTimeSlot: PropTypes.object,
  selectedDay: PropTypes.object,
  period: PropTypes.number.isRequired,
  holidayDateWeeklyPlanner: PropTypes.string,
  setHolidayModalOpen: PropTypes.func.isRequired,
};
export default Modal;
