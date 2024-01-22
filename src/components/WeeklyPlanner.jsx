import PropTypes from 'prop-types';
import { useState } from 'react';
import WeeklyPlannerModal from './WeeklyPlannerModal';

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
  '10h00',
  '11h00',
  '12h00',
  '13h00',
  '14h00',
  '15h00',
  '16h00',
  '17h00',
  '18h00',
  '19h00',
  '20h00',
];

const WeeklyPlanner = ({ editable = false, onSave }) => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [modalOpen, setModalOpen] = useState(false);
  const [day, setDay] = useState('');
  const [timeSlot, setTimeSlot] = useState('');

  const handleEdit = (selectedDay, selectedTimeSlot) => {
    if (!editable) return;
    setDay(selectedDay);
    setTimeSlot(selectedTimeSlot);
    setModalOpen(true);
  };

  return (
    <div>
      <h3>Weekly Planner</h3>
      <table className='border border-principal-color'>
        <thead className='h-16 bg-principal-color text-white'>
          <tr>
            <th>Time</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot) => (
            <tr key={timeSlot} className='h-16'>
              <td className='p-4'>{timeSlot}</td>
              {daysOfWeek.map((day) => {
                const scheduleItem = schedule
                  .find((item) => item.day === day)
                  .schedule.find((item) => item.timeSlot === timeSlot);
                return (
                  <td
                    key={`${day}-${timeSlot}`}
                    className={
                      editable && scheduleItem.available
                        ? 'editable bg-lime-600 p-4'
                        : 'bg-red-200 p-4'
                    }
                    onClick={() => (editable ? handleEdit(day, timeSlot) : '')}
                  >
                    {scheduleItem.available ? 'Disponible' : 'Non disponible'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen ? (
        <WeeklyPlannerModal
          setModalOpen={setModalOpen}
          schedule={schedule}
          setSchedule={setSchedule}
          day={day}
          timeSlot={timeSlot}
          onSave={onSave}
        />
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
