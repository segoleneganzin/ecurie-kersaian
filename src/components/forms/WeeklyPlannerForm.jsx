import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { removeTimeSlot, updateTimeSlot } from '../../api/WeeklyPlannerApi';

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
const WeeklyPlannerForm = ({
  closeModal,
  fetchPlanning,
  schedule,
  daysOfWeek,
  timeSlots,
  selectedTimeSlot,
  selectedDay,
  period,
  setDeleteButton,
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
  // const [deleteButton, setDeleteButton] = useState(null);
  // ************** GROUP CLASSNAMES
  const formClassName = 'mt-4 border-t-2 border-principal-color pt-2';
  const formDataContainerClassName = 'mb-4';
  const labelClassName = 'pr-2 text-lg font-bold';
  const inputClassName = 'border-b border-black max-w-12';
  const inputErrorClassName = 'border-b border-red-300';
  const buttonClassName =
    'm-auto w-fit rounded-md px-4 py-2 text-white shadow-sm transition ease-in-out duration-150 tracking-wide';
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
      title: 'Cours',
      cellBg: '#000000',
    },
  });

  const inputErrorClass = (field) => {
    const errorClasses = {
      cellBg: errors[field] ? inputErrorClassName : '',
      default: errors[field] ? inputErrorClassName : inputClassName,
    };
    return errorClasses[field] || errorClasses.default;
  };
  const inputErrorMessage = {
    duration: errors.duration ? 'Veuillez renseigner une durée valide' : '',
    title: errors.title ? 'Veuillez renseigner un intitulé' : '',
    cellBg: errors.cellBg ? 'Veuillez renseigner une couleur de fond' : '',
  };

  const isDurationValid = (value) => {
    let res = true;
    if (value % 15 !== 0 || value < 15) {
      res = false;
    }
    return res;
  };

  //******************************* Gestion des données du formulaire
  const updateState = () => {
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
          className={buttonClassName + ' bg-red-700 hover:bg-red-500'}
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
  };
  useEffect(() => {
    updateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Le tableau de dépendances vide signifie que cela s'exécute seulement une fois après le rendu initial

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
        await updateTimeSlot(dayIndex, i, { datas }, period);
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
        await removeTimeSlot(dayIndex, i, period);
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
    <form
      onSubmit={handleSubmit(addTimeSlot)}
      className={formClassName}
      noValidate
    >
      {/* day */}
      <p className={formDataContainerClassName}>
        <span className={labelClassName}>Jour :</span> {state.day}
      </p>
      {/* timeStart */}
      <p className={formDataContainerClassName}>
        <span className={labelClassName}>Heure de début :</span>{' '}
        {state.timeSlot}
      </p>
      {/* separation */}
      <div className='border-t-2 border-principal-color w-full mb-4'></div>
      {/* title */}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='title'>
          Intitulé :
        </label>
        <input
          id='title'
          name='title'
          type='text'
          className={inputErrorClass('title') + 'w-full'}
          {...register('title', { required: true })}
        />
      </div>
      {errors.title && (
        <span className='text-red-800'>{inputErrorMessage.title}</span>
      )}
      {/* duration */}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='duration'>
          Durée (tranche de 15 minutes) :
        </label>
        <input
          id='duration'
          name='duration'
          type='number'
          className={inputErrorClass('duration')}
          {...register('duration', {
            required: true,
            validate: isDurationValid,
          })}
        />
      </div>
      {errors.duration && (
        <span className='text-red-800'>{inputErrorMessage.duration}</span>
      )}

      {/* cell bg color */}
      <div className={formDataContainerClassName}>
        <label className={labelClassName} htmlFor='cellBg'>
          Couleur de fond :
        </label>
        <input
          id='cellBg'
          name='cellBg'
          type='color'
          className={inputErrorClass('cellBg')}
          {...register('cellBg', { required: true })}
        />
      </div>
      {errors.cellBg && (
        <span className='text-red-800'>{inputErrorMessage.cellBg}</span>
      )}
      <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <button
          className={buttonClassName + ' bg-green-700 hover:bg-green-500'}
        >
          Valider
        </button>
      </div>
    </form>
  );
};

WeeklyPlannerForm.propTypes = {
  closeModal: PropTypes.func,
  setModalOpen: PropTypes.func,
  fetchPlanning: PropTypes.func,
  schedule: PropTypes.arrayOf(PropTypes.object),
  daysOfWeek: PropTypes.arrayOf(PropTypes.string),
  timeSlots: PropTypes.arrayOf(PropTypes.string),
  selectedTimeSlot: PropTypes.object,
  selectedDay: PropTypes.object,
  period: PropTypes.string,
  setDeleteButton: PropTypes.func,
};
export default WeeklyPlannerForm;
