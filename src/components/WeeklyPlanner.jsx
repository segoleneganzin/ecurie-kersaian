/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchSchoolTimeWeeklyPlannerApi } from '../api/SchoolTimeWeeklyPlannerApi';
import WeeklyPlannerModal from './WeeklyPlannerModal';

/**
 * Composant pour afficher un planning hebdomadaire.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {boolean} props.editable - Indique si le planning est éditable.
 * @returns {JSX.Element} - Élément React représentant le composant.
 */
const WeeklyPlanner = ({ editable = false }) => {
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

  const initialSchedule = daysOfWeek.map((day) => ({
    day,
    schedule: timeSlots.map((timeSlot) => ({ timeSlot, available: true })),
  }));

  /**
   * État local pour le planning.
   * @type {Object}
   * @property {Array} schedule - Planning hebdomadaire.
   * @property {Object} selectedDay - Jour sélectionné.
   * @property {Object} selectedTimeSlot - Créneau horaire sélectionné.
   * @property {boolean} isModalOpen - Indique si la modale est ouverte.
   */
  const [schedule, setSchedule] = useState(initialSchedule);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  /**
   * Fonction pour récupérer le planning depuis l'API.
   * @async
   * @function
   */
  const fetchPlanning = async () => {
    const datas = await fetchSchoolTimeWeeklyPlannerApi();
    setSchedule(datas.days);
  };
  // Fetch initial schedule from Firestore
  useEffect(() => {
    fetchPlanning();
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

  return (
    <div className='p-4 pt-16 lg:p-16 sm:p-8' id='planning'>
      <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Le planning
      </h2>
      {/* *************************** */}
      <h3 className='font-bold text-2xl'>Période scolaire</h3>
      <div className='overflow-x-auto p-6'>
        <div className='max-h-500px overflow-scroll m-0 rounded-lg max-w-screen-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-fit'>
          <table className='rounded-lg'>
            <thead className='h-16 bg-principal-color text-white sticky top-0 z-20'>
              <tr>
                <th></th>
                {daysOfWeek.map((day) => (
                  <th key={day} className='min-w-28'>
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
        <WeeklyPlannerModal
          setModalOpen={setModalOpen}
          fetchPlanning={fetchPlanning}
          schedule={schedule}
          editable={editable}
          daysOfWeek={daysOfWeek}
          timeSlots={timeSlots}
          selectedTimeSlot={selectedTimeSlot}
          selectedDay={selectedDay}
        />
      ) : (
        ''
      )}
    </div>
  );
};

WeeklyPlanner.propTypes = {
  editable: PropTypes.bool,
};

export default WeeklyPlanner;
