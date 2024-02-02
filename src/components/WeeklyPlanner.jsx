import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchWeeklyPlanner } from '../api/WeeklyPlannerApi';
// import WeeklyPlannerModal from './WeeklyPlannerModal';
// import HolidayWeeklyPlannerModal from './HolidayWeeklyPlannerForm';
import Modal from './Modal';

/**
 * Composant pour afficher un planning hebdomadaire.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {boolean} props.editable - Indique si le planning est éditable.
 * @param {string} props.period - Période du planning (scolaire ou vacances).
 * @returns {JSX.Element} - Élément React représentant le composant.
 */
const WeeklyPlanner = ({ editable = false, period }) => {
  /**
   * Liste des jours de la semaine.
   * @type {string[]}
   */
  const daysOfWeek = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];

  /**
   * Liste des créneaux horaires.
   * @type {string[]}
   */
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

  /**
   * Planning initial avec tous les créneaux horaires disponibles.
   * @type {Array}
   */
  const initialSchedule = daysOfWeek.map((day) => ({
    day,
    schedule: timeSlots.map((timeSlot) => ({ timeSlot, available: true })),
  }));

  // CLASSNAME
  const adminEditButtonClassname =
    'bg-lime-800 cursor-pointer p-2 rounded-lg shadow-lg text-white tracking-widest w-fit mb-2';

  /**
   * État local pour le planning.
   * @type {Object}
   * @property {Array} schedule - Planning hebdomadaire.
   * @property {Object} selectedDay - Jour sélectionné.
   * @property {Object} selectedTimeSlot - Créneau horaire sélectionné.
   * @property {boolean} isModalOpen - Indique si la modale est ouverte.
   */
  const [schedule, setSchedule] = useState(initialSchedule);
  const [schedulePeriod, setSchedulePeriod] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHolidayModalOpen, setHolidayModalOpen] = useState(false);

  /**
   * Fonction pour récupérer le planning depuis l'API.
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
   * Fonction pour ouvrir la modale d'édition.
   * @function
   * @param {string} day - Jour sélectionné.
   * @param {string} timeSlot - Créneau horaire sélectionné.
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
   * Fonction pour ouvrir la modale d'édition des vacances.
   * @function
   */
  const openHolidayModal = () => {
    if (!editable) return;
    setHolidayModalOpen(true);
  };

  return (
    <div>
      {editable ? (
        <h4 className='text-principal-color font-bold text-2xl pl-2 sm:pl-8 md:pl-0 md:text-center'>
          {period === 'school' ? 'Période scolaire' : 'Vacances scolaires'}
        </h4>
      ) : (
        <h3 className='text-principal-color font-bold text-2xl pl-2 sm:pl-8 md:pl-0 md:text-center'>
          {period === 'school' ? 'Période scolaire' : 'Vacances scolaires'}
        </h3>
      )}

      {period === 'holiday' ? (
        <div className='flex flex-col md:items-center w-full pl-2 sm:pl-8 pt-0 md:pl-0 '>
          <p className='italic'>{schedulePeriod}</p>
          {editable ? (
            <button
              onClick={openHolidayModal}
              className={adminEditButtonClassname}
            >
              Modifier
            </button>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      <div className='overflow-x-auto m-2'>
        <div className='max-h-500px overflow-scroll m-auto sm:rounded-lg w-fit'>
          <table>
            <thead className='h-8 bg-principal-color text-white sticky top-0 z-20'>
              <tr>
                {/* <th className={editable ? 'min-w-16' : ''}></th> */}
                {daysOfWeek.map((day) => (
                  <th key={day} className='min-w-24 px-2'>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot) => (
                <tr key={timeSlot} className='h-6'>
                  {/* <td
                    className={
                      editable
                        ? 'align-top bg-principal-color text-white px-2 text-right left-0 sticky min-w-16 z-10'
                        : 'bg-principal-color'
                    }
                  >
                    {editable ? timeSlot : ''}
                  </td> */}
                  {daysOfWeek.map((day) => {
                    const scheduleItem = schedule
                      .find((item) => item.day === day)
                      .schedule.find((item) => item.timeSlot === timeSlot);
                    return (
                      <td
                        key={`${day}-${timeSlot}`}
                        className={
                          scheduleItem.available
                            ? editable
                              ? `border-t border-black bg-gray-200`
                              : 'bg-gray-200'
                            : `border-t-0 text-white h-fit`
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
                          <div className='text-center'>
                            {timeSlot === scheduleItem.startTime ? (
                              <p className='flex flex-col items-center px-1 w-full'>
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
                        ) : editable ? (
                          <div className='text-center text-gray-400 italic'>
                            {timeSlot}
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
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          type={'weeklyPlanner'}
          fetchPlanning={fetchPlanning}
          schedule={schedule}
          daysOfWeek={daysOfWeek}
          timeSlots={timeSlots}
          selectedTimeSlot={selectedTimeSlot}
          selectedDay={selectedDay}
          period={period}
        />
      )}
      {isHolidayModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          holidayDateWeeklyPlanner={schedulePeriod}
          type={'holidayWeeklyPlanner'}
          setModalOpen={setHolidayModalOpen}
          fetchPlanning={fetchPlanning}
        />
      )}
    </div>
  );
};

WeeklyPlanner.propTypes = {
  editable: PropTypes.bool,
  period: PropTypes.string,
};

export default WeeklyPlanner;
