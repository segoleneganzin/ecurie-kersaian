/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  fetchSchoolTimeWeeklyPlannerApi,
  removeTimeSlot,
  updateTimeSlot,
} from '../api/SchoolTimeWeeklyPlannerApi';

// import WeeklyPlannerModal from './WeeklyPlannerModal';

const daysOfWeek = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
];

const timeSlots = [
  '8h00',
  '8h15',
  '8h30',
  '8h45',
  '9h00',
  '9h15',
  '9h30',
  '9h45',
  '10h00',
  '10h15',
  '10h30',
  '10h45',
  '11h00',
  '11h15',
  '11h30',
  '11h45',
  '12h00',
  '12h15',
  '12h30',
  '12h45',
  '13h00',
  '13h15',
  '13h30',
  '13h45',
  '14h00',
  '14h15',
  '14h30',
  '14h45',
  '15h00',
  '15h15',
  '15h30',
  '15h45',
  '16h00',
  '16h15',
  '16h30',
  '16h45',
  '17h00',
  '17h15',
  '17h30',
  '17h45',
  '18h00',
  '18h15',
  '18h30',
  '18h45',
  '19h00',
  '19h15',
  '19h30',
  '19h45',
  '20h00',
];

const WeeklyPlanner = ({ editable = false, onSave }) => {
  // const [schedule, setSchedule] = useState(initialSchedule);
  const [schedule, setSchedule] = useState(initialSchedule);
  // console.log(schedule);
  // console.log(scheduleTest.days);

  // const [schedule, setSchedule] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState({
    day: null,
    timeSlot: null,
    available: true,
    duration: 60,
    title: null,
    startTime: null,
    endTime: null,
    cellBg: null,
  });
  const [deleteButton, setDeleteButton] = useState(null);

  const fetchPlanning = async () => {
    const datas = await fetchSchoolTimeWeeklyPlannerApi();
    setSchedule(datas.days);
  };
  // Fetch initial schedule from Firestore
  useEffect(() => {
    fetchPlanning();
  }, []);

  const openModal = (day, timeSlot) => {
    if (!editable) return;
    const selectedDay = schedule.find((item) => item.day === day);
    const selectedTimeSlot = selectedDay.schedule.find(
      (item) => item.timeSlot === timeSlot
    );
    if (!selectedTimeSlot.available) {
      setState({
        day: day,
        timeSlot: selectedTimeSlot.startTime,
        available: false,
        duration: selectedTimeSlot.duration,
        title: selectedTimeSlot.title,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        cellBg: selectedTimeSlot.cellBg,
      });
      setValue('duration', selectedTimeSlot.duration);
      setValue('title', selectedTimeSlot.title);
      setValue('cellBg', selectedTimeSlot.cellBg);
      setDeleteButton(
        <button
          onClick={() =>
            deleteTimeSlot(day, selectedTimeSlot.startTime, schedule)
          }
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
        >
          Supprimer
        </button>
      );
      setModalOpen(true);
    } else {
      setDeleteButton('');
      reset({
        duration: 60,
        title: 'test',
        cellBg: '#000000',
      });
      setState({
        day,
        timeSlot,
        startTime: timeSlot,
      });
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    // reset values
    setState({
      day: null,
      timeSlot: null,
      available: true,
      duration: 60,
      title: null,
      startTime: null,
      endTime: null,
      cellBg: null,
    });
  };

  const addTimeSlot = async () => {
    if (!editable) return;
    try {
      const selectedDay = schedule.find((item) => item.day === state.day);
      const dayIndex = daysOfWeek.findIndex((item) => item === state.day);
      const timeSlot = selectedDay.schedule.find(
        (item) => item.timeSlot === state.timeSlot
      );
      console.log(timeSlot);
      const timeSlotIndex = selectedDay.schedule.findIndex(
        (item) => item.timeSlot === state.timeSlot
      );
      const inputDuration = getValues('duration');
      const inputTitle = getValues('title');
      const inputCellBg = getValues('cellBg');
      setState({
        duration: inputDuration,
        title: inputTitle,
        cellBg: inputCellBg,
      });
      const numberOfSlots = inputDuration / 15; // 15 minutes par case
      const TimeSlotsLength = timeSlotIndex + numberOfSlots;
      const startTime = timeSlot.timeSlot;
      const endTime =
        timeSlots[timeSlots.indexOf(startTime) + inputDuration / 15];
      if (!timeSlot.available) {
        console.log(state.day + ' ' + timeSlot.startTime);
        // gestion de la réduction du temps
        await deleteTimeSlot(state.day, timeSlot.startTime);
      }
      for (let i = timeSlotIndex; i < TimeSlotsLength; i++) {
        const datas = {
          timeSlot: timeSlots[i],
          available: false,
          duration: inputDuration,
          title: inputTitle,
          cellBg: inputCellBg,
          startTime: startTime,
          endTime: endTime,
        };
        await updateTimeSlot(dayIndex, i, { datas });
      }
      // Recharger le planning
      fetchPlanning();
      // Fermer la modale
      closeModal();
    } catch (error) {
      console.log('Error getting cached document:', error);
    }
  };

  const deleteTimeSlot = async (day, startTime) => {
    if (!editable) return;
    try {
      console.log(schedule);
      const selectedDay = schedule.find((item) => item.day === day);
      const dayIndex = daysOfWeek.findIndex((item) => item === day);
      const startTimeSlotIndex = selectedDay.schedule.findIndex(
        (item) => item.timeSlot === startTime
      );
      const timeSlot = selectedDay['schedule'].find(
        (item) => item.startTime === startTime
      );
      const numberOfSlots = timeSlot.duration / 15; // 15 minutes par case
      const TimeSlotsLength = startTimeSlotIndex + numberOfSlots;
      for (let i = startTimeSlotIndex; i < TimeSlotsLength; i++) {
        const datas = {
          timeSlot: timeSlots[i],
          available: true,
        };
        await removeTimeSlot(dayIndex, i);
      }
      // Recharger le planning
      fetchPlanning();
      // Fermer la modale
      closeModal();
    } catch (error) {
      console.log('Error getting cached document:', error);
    }
  };

  //********************************************** manage error into modal form
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

  return (
    <div>
      <h3>Weekly Planner</h3>
      <div className='overflow-x-auto p-6'>
        <div className='max-h-500px overflow-scroll m-0 rounded-lg max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl'>
          <table className='rounded-lg'>
            <thead className='h-16 bg-principal-color text-white sticky top-0 z-20'>
              <tr>
                <th></th>
                {daysOfWeek.map((day) => (
                  <th key={day} className='min-w-36'>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot) => (
                <tr key={timeSlot} className='h-10 left-0'>
                  <td
                    className={
                      'align-top bg-principal-color text-white pl-2 pr-2 text-right leading-4 left-0 sticky z-10'
                    }
                  >
                    {timeSlot}
                  </td>
                  {daysOfWeek.map((day) => {
                    const scheduleItem = schedule
                      .find((item) => item.day === day)
                      .schedule.find((item) => item.timeSlot === timeSlot);
                    return (
                      <td
                        key={`${day}-${timeSlot}`}
                        className={
                          scheduleItem.available
                            ? `border-t border-black bg-lime-200 h-fit`
                            : `border-t-0 border-black text-white h-fit`
                        }
                        style={{
                          backgroundColor: scheduleItem.available
                            ? ''
                            : scheduleItem.cellBg,
                        }}
                        onClick={() =>
                          editable ? openModal(day, timeSlot) : ''
                        }
                      >
                        {!scheduleItem.available ? (
                          <div className='text-center p-0 m-0'>
                            {timeSlot === scheduleItem.startTime ? (
                              <p className='text-center p-0 m-0 flex flex-col'>
                                <span>
                                  {scheduleItem.startTime}/
                                  {scheduleItem.endTime}
                                </span>
                                <span>{scheduleItem.title}</span>
                              </p>
                            ) : (
                              ''
                            )}
                          </div>
                        ) : (
                          ''
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modale pour ajouter un nouveau créneau */}
      {isModalOpen ? (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              onClick={closeModal}
            >
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
                      Ajouter ou modifier un créneau
                    </h3>
                    <form
                      onSubmit={handleSubmit(addTimeSlot)}
                      className='mt-2'
                      noValidate
                    >
                      {/* day */}
                      <p>Jour : {state.day}</p>
                      {/* timeStart */}
                      <p>Heure de début : {state.timeSlot}</p>
                      {/* duration */}
                      <label
                        className='block mb-2 text-lg font-bold'
                        htmlFor='duration'
                      >
                        Durée (tranche de 15 minutes):
                      </label>
                      <input
                        id='duration'
                        name='duration'
                        type='number'
                        className={inputErrorClass.duration}
                        {...register('duration', { required: true })}
                      />
                      {errors.duration && (
                        <span className='text-red-800'>
                          {inputErrorMessage.duration}
                        </span>
                      )}
                      {/* title */}
                      <label
                        className='block mb-2 text-lg font-bold'
                        htmlFor='title'
                      >
                        Intitulé :
                      </label>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        className={inputErrorClass.title}
                        {...register('title', { required: true })}
                      />
                      {errors.title && (
                        <span className='text-red-800'>
                          {inputErrorMessage.title}
                        </span>
                      )}
                      {/* cell bg color */}
                      <label
                        className='block mb-2 text-lg font-bold'
                        htmlFor='cellBg'
                      >
                        Choisissez une couleur de fond :
                      </label>
                      <input
                        id='cellBg'
                        name='cellBg'
                        type='color'
                        className={inputErrorClass.cellBg}
                        {...register('cellBg', { required: true })}
                      />
                      {errors.cellBg && (
                        <span className='text-red-800'>
                          {inputErrorMessage.cellBg}
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
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
                  {/* <button
                    onClick={() =>
                      deleteTimeSlot(state.day, state.startTime, schedule)
                    }
                    type='button'
                    className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                  >
                    Supprimer
                  </button> */}
                  {deleteButton}
                </span>
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
      ) : (
        ''
      )}
    </div>
  );
};

// Initial Schedule (can be fetched from an API or a backend)
const initialSchedule = daysOfWeek.map((day) => ({
  day,
  schedule: timeSlots.map((timeSlot) => ({ timeSlot, available: true })),
}));

WeeklyPlanner.propTypes = {
  editable: PropTypes.bool,
  onSave: PropTypes.func,
};
export default WeeklyPlanner;
