import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchWeeklyPlanner } from '../api/WeeklyPlannerApi';
import Modal from '../layouts/Modal';
import WeeklyPlannerForm from '../components/admin/forms/WeeklyPlannerForm';
import HolidayWeeklyPlannerForm from '../components/admin/forms/HolidayWeeklyPlannerForm';

/**
 * Component for display weekly planner
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.editable
 * @param {string} props.period
 * @returns {JSX.Element}
 */
const WeeklyPlanner = ({ editable = false, period }) => {
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

  /**
   * Initial schedule with all available time slots.
   * @type {Array}
   */
  const initialSchedule = daysOfWeek.map((day) => ({
    day,
    schedule: timeSlots.map((timeSlot) => ({ timeSlot, available: true })),
  }));

  const [schedule, setSchedule] = useState(initialSchedule);
  const [schedulePeriod, setSchedulePeriod] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHolidayModalOpen, setHolidayModalOpen] = useState(false);

  /**
   * Function to retrieve the schedule from the API.
   * @async
   * @function
   */
  const fetchPlanning = async () => {
    const datas = await fetchWeeklyPlanner(period);
    setSchedule(datas.days);
    setSchedulePeriod(datas.dates);
  };
  useEffect(() => {
    fetchPlanning();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Open schedule editing modal
   * @function
   * @param {string} day
   * @param {string} timeSlot
   */
  const openModal = (day, timeSlot) => {
    if (!editable) return;
    const adminSelectedDay = schedule.find((item) => item.day === day);
    setSelectedDay(adminSelectedDay);
    setSelectedTimeSlot(
      adminSelectedDay.schedule.find((item) => item.timeSlot === timeSlot)
    );
    setModalOpen(true);
  };

  /**
   * Function to open the holiday editing mode for date management
   * @function
   */
  const openHolidayModal = () => {
    if (!editable) return;
    setHolidayModalOpen(true);
  };

  return (
    <div>
      {editable ? (
        <h4 className='text-principal-color font-bold text-2xl pl-0 sm:pl-8  md:text-center'>
          {period === 'school' ? 'Période scolaire' : 'Vacances scolaires'}
        </h4>
      ) : (
        <h3 className='text-principal-color font-bold text-2xl pl-0 sm:pl-8 md:text-center'>
          {period === 'school' ? 'Période scolaire' : 'Vacances scolaires'}
        </h3>
      )}

      {period === 'holiday' && (
        <div className='flex gap-8 md:justify-center w-full pl-2 sm:pl-8 pt-0 md:pl-0 '>
          <p className='italic'>{schedulePeriod}</p>
          {editable && (
            <button onClick={openHolidayModal} className='h-6 w-6'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path
                  fill='#033e0c'
                  d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z'
                />
              </svg>
            </button>
          )}
        </div>
      )}
      <div className='overflow-x-auto my-2 lg:m-2'>
        <div className='max-h-500px overflow-scroll m-auto sm:rounded-lg w-fit border-2 border-secondary-color'>
          <table>
            <thead className='h-8 bg-secondary-color text-white sticky top-0 z-20'>
              <tr>
                {daysOfWeek.map((day) => (
                  <th key={day} className='min-w-24 px-2'>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot) => (
                <tr key={timeSlot} className='h-6 max-h-6'>
                  {daysOfWeek.map((day) => {
                    const scheduleItem = schedule
                      .find((item) => item.day === day)
                      .schedule.find((item) => item.timeSlot === timeSlot);
                    const numberOfSlots =
                      scheduleItem && !scheduleItem.available
                        ? scheduleItem.duration / 15
                        : 1;
                    return scheduleItem && !scheduleItem.available ? (
                      timeSlot === scheduleItem.startTime && (
                        <td
                          key={`${day}-${timeSlot}`}
                          className={`border-t-1 border-t-black text-black w-fit`}
                          style={{
                            backgroundColor: scheduleItem.available
                              ? ''
                              : scheduleItem.cellBg,
                          }}
                          rowSpan={numberOfSlots}
                          onClick={() => editable && openModal(day, timeSlot)}
                        >
                          <p className='flex flex-col items-center px-1 text-center w-fit'>
                            {scheduleItem.startTime}/{scheduleItem.endTime}
                            {Array.isArray(scheduleItem.title) ? (
                              scheduleItem.title.map((line, index) => (
                                <span key={index} className='w-fit'>
                                  {line}
                                  <br />
                                </span>
                              ))
                            ) : (
                              <span>{scheduleItem.title}</span>
                            )}
                          </p>
                        </td>
                      )
                    ) : scheduleItem && editable ? (
                      <td
                        key={`${day}-${timeSlot}-editable`}
                        className={`border-t border-black bg-gray-200 text-center`}
                        style={{
                          backgroundColor: scheduleItem.available
                            ? ''
                            : scheduleItem.cellBg,
                        }}
                        rowSpan={numberOfSlots}
                        onClick={() => editable && openModal(day, timeSlot)}
                      >
                        {timeSlot}
                      </td>
                    ) : (
                      <td
                        key={`${day}-${timeSlot}-available`}
                        className='bg-gray-200'
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal to add a new slot */}
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          title={'Gestion des plannings'}
        >
          <WeeklyPlannerForm
            fetchPlanning={fetchPlanning}
            schedule={schedule}
            daysOfWeek={daysOfWeek}
            timeSlots={timeSlots}
            selectedTimeSlot={selectedTimeSlot}
            selectedDay={selectedDay}
            period={period}
            // setDeleteButton={setDeleteButton}
          />
        </Modal>
      )}
      {/* Modal to manage holiday dates */}
      {isHolidayModalOpen && (
        <Modal
          isModalOpen={isHolidayModalOpen}
          setModalOpen={setHolidayModalOpen}
          title={'Gestion des plannings'}
        >
          <HolidayWeeklyPlannerForm
            holidayDateWeeklyPlanner={schedulePeriod}
            fetchPlanning={fetchPlanning}
          />
        </Modal>
      )}
    </div>
  );
};

WeeklyPlanner.propTypes = {
  editable: PropTypes.bool,
  period: PropTypes.string,
};

export default WeeklyPlanner;
