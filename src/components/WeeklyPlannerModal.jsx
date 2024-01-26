/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  removeTimeSlot,
  updateTimeSlot,
} from '../api/SchoolTimeWeeklyPlannerApi';

/**
 * Composant Modal pour ajouter ou modifier un créneau horaire dans le planning hebdomadaire.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {function} props.setModalOpen - Fonction pour fermer la modal.
 * @param {function} props.fetchPlanning - Fonction pour recharger le planning.
 * @param {Object[]} props.schedule - Le tableau des jours avec les créneaux horaires.
 * @param {string[]} props.daysOfWeek - Le tableau des jours de la semaine.
 * @param {string[]} props.timeSlots - Le tableau des créneaux horaires de la journée.
 * @param {Object} props.selectedTimeSlot - Le créneau horaire sélectionné.
 * @param {Object} props.selectedDay - Le jour sélectionné.
 * @returns {JSX.Element} - L'élément JSX du composant Modal.
 */
const WeeklyPlannerModal = ({
  setModalOpen,
  fetchPlanning,
  schedule,
  daysOfWeek,
  timeSlots,
  selectedTimeSlot,
  selectedDay,
}) => {
  const [state, setState] = useState({
    day: null,
    time: null,
    available: true,
    duration: 60,
    title: null,
    startTime: null,
    endTime: null,
    cellBg: null,
  });
  const [deleteButton, setDeleteButton] = useState(null);
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

  //******************************* Gestion des données du formulaire
  useEffect(() => {
    if (!selectedTimeSlot.available) {
      setState({
        day: selectedDay.day,
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
            deleteTimeSlot(
              selectedDay.day,
              selectedTimeSlot.startTime,
              schedule
            )
          }
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
        >
          Supprimer
        </button>
      );
    } else {
      setDeleteButton('');
      reset({
        duration: 60,
        title: 'test',
        cellBg: '#000000',
      });
      setState({
        day: selectedDay.day,
        timeSlot: selectedTimeSlot.timeSlot,
        startTime: selectedTimeSlot.timeSlot,
      });
    }
  }, []); // Le tableau de dépendances vide signifie que cela s'exécute seulement une fois après le rendu initial

  const closeModal = () => {
    setModalOpen(false);
    // Réinitialisation des valeurs
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

  /**
   * Ajoute ou modifie le créneau horaire dans le planning.
   */
  const addTimeSlot = async () => {
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

  /**
   * Supprime le créneau horaire du planning.
   *
   * @param {string} day - Le jour du créneau horaire.
   * @param {string} startTime - L'heure de début du créneau horaire.
   */
  const deleteTimeSlot = async (day, startTime) => {
    try {
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
  );
};

export default WeeklyPlannerModal;
