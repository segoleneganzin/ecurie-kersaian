/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const WeeklyPlannerModal = (
  closeModal,
  selectedDay,
  selectedTimeSlot,
  onSave,
  editable
) => {
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

  // form management
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useForm({
    defaultValues: {
      name: '',
      level: '',
      type: '',
    },
  });

  const inputErrorClass = {
    name: errors.name ? ' input-error' : '',
    level: errors.level ? ' input-error' : '',
    type: errors.type ? ' input-error' : '',
  };
  const inputErrorMessage = {
    name: errors.name ? 'Veuillez renseigner un nom' : '',
    level: errors.level
      ? 'Veuillez renseigner un niveau (multiple de 5) >= 25'
      : '',
    type: errors.type ? 'Veuillez renseigner le type' : '',
  };

  //   Planner function management
  const addTimeSlot = () => {
    if (!editable) return;
    // Logique pour ajouter le nouveau créneau à l'état du planning
    const updatedSchedule = [...schedule];
    const selectedDay = updatedSchedule.find((item) => item.day === state.day);
    const timeSlotIndex = selectedDay.schedule.findIndex(
      (item) => item.timeSlot === state.time
    );
    const durationInSlots = state.duration / 15 + 1; // 15 minutes par case
    // TODO verifier que le créneau ne dépasse pas sur un autre déjà créé
    // Récupérer l'heure de début et l'heure de fin
    const startTime = state.time;
    const endTime =
      timeSlots[timeSlots.indexOf(startTime) + state.duration / 15];
    const slotsToAdd = Array.from({ length: durationInSlots }).map(
      (_, index) => ({
        timeSlot: timeSlots[timeSlots.indexOf(state.time) + index],
        available: false,
        duration: state.duration,
        // title: index === 0 ? state.title : '',
        title: state.title,
        startTime: startTime,
        endTime: endTime,
        cellBg: state.cellBg,
      })
    );

    selectedDay.schedule.splice(timeSlotIndex, 1, ...slotsToAdd);

    // Sauvegarder le planning mis à jour
    setSchedule(updatedSchedule);
    onSave(updatedSchedule);

    // Fermer la modale
    closeModal();
  };

  const deleteTimeSlot = (day, startTime, schedule) => {
    const updatedSchedule = [...schedule];
    const selectedDay = updatedSchedule.find((item) => item.day === day);
    console.log(selectedDay);
    const selectedTimeSlot = selectedDay.schedule.find(
      (item) => item.startTime === startTime
    );
    const timeSlotIndexStart = selectedDay.schedule.findIndex(
      (item) => item.startTime === startTime
    );
    const timeSlotNumberCell = selectedTimeSlot.duration / 15;
    // Vérifier si le créneau existe avant de le supprimer
    if (timeSlotIndexStart !== -1) {
      const cellToAvailable = [];
      for (
        let i = timeSlotIndexStart;
        i <= timeSlotIndexStart + timeSlotNumberCell;
        i++
      ) {
        cellToAvailable.push(i);
      }
      console.log(cellToAvailable);
      for (const cell of cellToAvailable) {
        selectedDay.schedule[cell].available = true;
      }
      // Mettre à jour l'état du planning
      setSchedule(updatedSchedule);
      onSave(updatedSchedule);
      closeModal();
    }
  };

  const editTimeSlot = (day, startTime, schedule) => {
    console.log(day + startTime);
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
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
                  Ajouter un créneau
                </h3>
                <form className='mt-2'>
                  <label>Jour:</label>
                  <p>{state.day}</p>
                  <label>Heure:</label>
                  <p>{state.time}</p>
                  <label htmlFor='duration'>Durée (minutes):</label>
                  <input
                    type='number'
                    id='duration'
                    value={state.duration}
                    onChange={(e) =>
                      setState({
                        ...state,
                        duration: e.target.value,
                      })
                    }
                  />
                  <label htmlFor='title'>Intitulé :</label>
                  <input
                    type='text'
                    id='title'
                    value={state.title}
                    onChange={(e) =>
                      setState({
                        ...state,
                        title: e.target.value,
                      })
                    }
                  />
                  {/* couleur */}
                  <label
                    className='block mb-2 text-lg font-bold'
                    htmlFor='cellBg'
                  >
                    Choisissez une couleur de fond :
                  </label>
                  <input
                    type='color'
                    id='cellBg'
                    className='p-2 border border-gray-300 rounded'
                    value={state.cellBg}
                    onChange={(e) =>
                      setState({
                        ...state,
                        cellBg: e.target.value,
                      })
                    }
                  />
                </form>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
              <button
                onClick={addTimeSlot}
                type='button'
                className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
              >
                Valider
              </button>
            </span>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <span className='mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto'>
              <button
                onClick={() =>
                  deleteTimeSlot(state.day, state.startTime, schedule)
                }
                type='button'
                className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5'
              >
                Supprimer
              </button>
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
