import { useState } from 'react';
import PropTypes from 'prop-types';
import { removeTimeSlot, updateTimeSlot } from '../../../api/WeeklyPlannerApi';
import { buttonClassName } from '../../../utils/GeneralClassNames';
import { Form } from 'sg-form-lib';
import { formFieldsConfig } from '../../../formFieldsconfig';

/**
 * Modal component to add or modify a time slot in the weekly schedule.
 * @component
 * @param {Object} props
 * @param {function} props.fetchPlanning
 * @param {Object[]} props.schedule
 * @param {string[]} props.daysOfWeek
 * @param {string[]} props.timeSlots
 * @param {Object} props.selectedTimeSlot
 * @param {Object} props.selectedDay
 * @param {Function} props.setModalOpen
 * @returns {JSX.Element}
 */
const WeeklyPlannerForm = ({
  fetchPlanning,
  schedule,
  daysOfWeek,
  timeSlots,
  selectedTimeSlot,
  selectedDay,
  setModalOpen,
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const [state, setState] = useState({
    day: selectedDay.day,
    timeSlot: selectedTimeSlot.timeSlot,
    isAvailable: selectedTimeSlot.available,
    duration: selectedTimeSlot.available ? 60 : selectedTimeSlot.duration,
    title: selectedTimeSlot.available ? ' ' : selectedTimeSlot.title.join('\n'),
    startTime: selectedTimeSlot.timeSlot,
    endTime: selectedTimeSlot.available ? null : selectedTimeSlot.endTime,
    cellBg: selectedTimeSlot.available ? '#ffffff' : selectedTimeSlot.cellBg,
  });

  /**
   * Adds or modifies the time slot in the schedule.
   */
  const addTimeSlot = async (inputDuration, inputTitle, inputCellBg) => {
    try {
      const selectedDay = schedule.find((item) => item.day === state.day);
      const dayIndex = daysOfWeek.findIndex((item) => item === state.day);
      const timeSlot = selectedDay.schedule.find(
        (item) => item.timeSlot === state.timeSlot
      );
      const timeSlotIndex = selectedDay.schedule.findIndex(
        (item) => item.timeSlot === state.timeSlot
      );
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
        await updateTimeSlot(dayIndex, i, { datas }, 'holiday');
      }
      fetchPlanning();
      setModalOpen(false);
    } catch (error) {
      setErrorMessage("Une erreur s'est produite");
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
        await removeTimeSlot(dayIndex, i, 'holiday');
      }
      fetchPlanning();
      setModalOpen(false);
    } catch (error) {
      console.log('Error getting cached document:', error);
    }
  };

  return (
    <>
      <Form
        fieldsConfig={formFieldsConfig}
        title={state.isAvailable ? 'Nouvelle séance' : 'Modifier la séance'}
        subtitle={
          <>
            <span className='font-bold underline'>Jour :</span>{' '}
            {' ' + state.day} <br />
            <span className='font-bold underline'>Heure de début :</span>
            {' ' + state.timeSlot}
          </>
        }
        onSubmitFunction={addTimeSlot}
        btnText={'Valider'}
        errorMessage={errorMessage}
        fieldNames={['title', 'duration', 'cellBg']}
        fieldValue={{
          title: state.title,
          duration: state.duration,
          cellBg: state.cellBg,
        }}
      />
      {!state.isAvailable && (
        <button
          onClick={() =>
            deleteTimeSlot(
              selectedDay.day,
              selectedTimeSlot.startTime,
              schedule
            )
          }
          type='button'
          className={
            buttonClassName + ' mt-4 bg-red-700 hover:bg-red-500 w-full'
          }
        >
          Supprimer
        </button>
      )}
    </>
  );
};

WeeklyPlannerForm.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  fetchPlanning: PropTypes.func.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  daysOfWeek: PropTypes.arrayOf(PropTypes.string).isRequired,
  timeSlots: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTimeSlot: PropTypes.object.isRequired,
  selectedDay: PropTypes.object.isRequired,
};

export default WeeklyPlannerForm;
