import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { removeTimeSlot, updateTimeSlot } from '../../../api/WeeklyPlannerApi';
import {
  formClassName,
  labelClassName,
  formDataContainerClassName,
  inputClassName,
  inputErrorClassName,
  textareaContainerClassName,
  textareaClassName,
  textareaErrorClassName,
  errorMessageClassName,
  buttonClassName,
} from '../../../utils/GeneralClassNames';
/**
 * Modal component to add or modify a time slot in the weekly schedule.
 * @component
 * @param {Object} props
 * @param {function} props.closeModal
 * @param {function} props.fetchPlanning
 * @param {Object[]} props.schedule
 * @param {string[]} props.daysOfWeek
 * @param {string[]} props.timeSlots
 * @param {Object} props.selectedTimeSlot
 * @param {Object} props.selectedDay
 * @param {string} props.period - school or holiday
 * @param {function} props.setDeleteButton
 * @returns {JSX.Element}
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

  /**
   * Function to obtain the error class for a given field.
   * @param {string} field
   * @returns {string} - Field error class.
   */
  const inputErrorClass = (field) => {
    const errorClasses = {
      title: errors[field] ? textareaErrorClassName : textareaClassName,
      cellBg: errors[field] ? inputErrorClassName : 'h-6 border rounded-md',
      default: errors[field] ? inputErrorClassName : inputClassName,
    };
    return errorClasses[field] || errorClasses.default;
  };

  /**
   * Obtain the error message for a given field.
   */
  const inputErrorMessage = {
    duration: errors.duration ? 'Veuillez renseigner une durée valide' : '',
    title: errors.title ? 'Veuillez renseigner un intitulé' : '',
    cellBg: errors.cellBg ? 'Veuillez renseigner une couleur de fond' : '',
  };

  /**
   * Check if the duration is valid (multiple of 15 minutes and greater than 15 minutes).
   * @param {number} value
   * @returns {boolean}
   */
  const isDurationValid = (value) => {
    let res = true;
    if (value % 15 !== 0 || value < 15) {
      res = false;
    }
    return res;
  };

  // Fill in the data in the form fields (with existing datas if timeslot isn't available, or default if it is)
  const updateState = () => {
    if (!selectedTimeSlot.available) {
      const formattedTitle = selectedTimeSlot.title.join('\n');
      setState({
        day: selectedDay.day,
        timeSlot: selectedTimeSlot.startTime,
        available: false,
        duration: selectedTimeSlot.duration,
        title: formattedTitle,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        cellBg: selectedTimeSlot.cellBg,
      });
      setValue('duration', selectedTimeSlot.duration);
      setValue('title', formattedTitle);
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
        title: 'Cours',
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
  }, []);

  /**
   * Adds or modifies the time slot in the schedule.
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
      const titleLines = inputTitle.split('\n');
      const endTime =
        timeSlots[timeSlots.indexOf(startTime) + inputDuration / 15];
      if (!timeSlot.available) {
        // time reduction management
        await deleteTimeSlot(state.day, timeSlot.startTime);
      }
      for (let i = timeSlotIndex; i < TimeSlotsLength; i++) {
        const datas = {
          timeSlot: timeSlots[i],
          available: false,
          duration: inputDuration,
          title: titleLines,
          cellBg: inputCellBg,
          startTime: startTime,
          endTime: endTime,
        };
        await updateTimeSlot(dayIndex, i, { datas }, period);
      }
      fetchPlanning();
      closeModal();
    } catch (error) {
      console.log('Error getting cached document:', error);
    }
  };

  /**
   * Deletes the time slot from the schedule.
   *
   * @param {string} day
   * @param {string} startTime
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
      const numberOfSlots = timeSlot.duration / 15; // 15 minutes per slot
      const TimeSlotsLength = startTimeSlotIndex + numberOfSlots;
      for (let i = startTimeSlotIndex; i < TimeSlotsLength; i++) {
        await removeTimeSlot(dayIndex, i, period);
      }
      fetchPlanning();
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
      <div className='mb-4'>
        {/* day */}
        <p>Jour : {state.day}</p>
        {/* start time */}
        <p>Heure de début :{state.timeSlot}</p>
      </div>
      {/* separation */}
      <div className='border-t-2 border-principal-color w-full mb-4'></div>
      {/* title */}
      <div className={textareaContainerClassName}>
        <label className={labelClassName} htmlFor='title'>
          Intitulé :
        </label>
        <textarea
          id='title'
          name='title'
          type='text'
          rows='5'
          className={inputErrorClass('title') + ' w-full'}
          {...register('title', { required: true })}
        />
      </div>
      {errors.title && (
        <span className={errorMessageClassName}>{inputErrorMessage.title}</span>
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
        <span className={errorMessageClassName}>
          {inputErrorMessage.duration}
        </span>
      )}

      {/* background color of timeslot */}
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
        <span className={errorMessageClassName}>
          {inputErrorMessage.cellBg}
        </span>
      )}
      <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
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
