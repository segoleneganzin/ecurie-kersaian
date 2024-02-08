import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * Fonction asynchrone pour récupérer les données du planning hebdomadaire depuis Firebase.
 *
 * @async
 * @function
 * @returns {Promise<Object>} - Les données du planning hebdomadaire.
 */
const fetchWeeklyPlanner = async (period) => {
  try {
    if (window.sessionStorage.getItem(`${period}WeeklyPlanner`) === null) {
      // console.log(`${period} weekly planner not cached`);
      const querySnapshot = await getDoc(
        doc(db, `${period}WeeklyPlanner`, 'schedule')
      );
      sessionStorage.setItem(
        `${period}WeeklyPlanner`,
        JSON.stringify(querySnapshot.data())
      );
      return querySnapshot.data();
    } else {
      // console.log(`${period} weekly planner already cached`);
      return JSON.parse(
        window.sessionStorage.getItem(`${period}WeeklyPlanner`)
      );
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Fonction asynchrone pour ajouter des jours au planning hebdomadaire dans Firebase.
 *
 * @async
 * @function
 * @param {Object} datas - Les données des jours à ajouter.
 */
const addDays = async (datas, period) => {
  try {
    await setDoc(doc(db, `${period}WeeklyPlanner`, 'schedule'), datas);
    sessionStorage.removeItem(`${period}WeeklyPlanner`);
  } catch (error) {
    console.log(error);
  }
};
// ****** code pour créer automatiquement les données par défaut (à utiliser dans le fichier WeeklyPlanner)
// const createDatas = () => {
//   const days = [];
//   daysOfWeek.forEach((day) => {
//     const scheduleDatas = [];
//     timeSlots.forEach((timeSlot) =>
//       scheduleDatas.push({ timeSlot, available: true })
//     );
//     days.push({ day: day, schedule: scheduleDatas });
//   });
//   const datas = { days };
//   addDays(datas, period);
// };
// createDatas();
// ***************************************************************

/**
 * Fonction asynchrone pour mettre à jour un créneau horaire spécifique dans le planning.
 *
 * @async
 * @function
 * @param {number} dayIndex - L'index du jour dans le tableau des jours.
 * @param {number} timeSlotIndex - L'index du créneau horaire dans le tableau des créneaux horaires.
 * @param {Object} datas - Les nouvelles données du créneau horaire.
 */
const updateTimeSlot = async (dayIndex, timeSlotIndex, { datas }, period) => {
  try {
    // Récupération des données existantes depuis Firebase
    const docDatas = await fetchWeeklyPlanner(period);
    // Récupération du créneau horaire spécifique que vous souhaitez mettre à jour
    const targetTimeSlot = docDatas.days[dayIndex]['schedule'][timeSlotIndex];
    // Mise à jour du créneau horaire avec les nouvelles données
    const updatedTimeSlot = {
      ...targetTimeSlot,
      ...datas,
    };
    // Mise à jour du créneau horaire spécifique dans le tableau des jours
    docDatas.days[dayIndex]['schedule'][timeSlotIndex] = updatedTimeSlot;
    await updateDoc(doc(db, `${period}WeeklyPlanner`, 'schedule'), docDatas);
    sessionStorage.removeItem(`${period}WeeklyPlanner`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Met à jour les dates de vacances dans la collection "holidayWeeklyPlanner".
 *
 * @async
 * @function
 * @param {Array<string>} dates - Les nouvelles dates de vacances à mettre à jour.
 * @throws {Error} Une erreur si la mise à jour des dates échoue.
 */
const updateHolidayDates = async (dates) => {
  try {
    // Utilisation de la fonction updateDoc pour mettre à jour les dates de vacances
    await updateDoc(doc(db, `holidayWeeklyPlanner`, 'schedule'), {
      dates: dates,
    });
    sessionStorage.removeItem(`holidayWeeklyPlanner`);
  } catch (error) {
    // Gestion des erreurs en affichant l'erreur dans la console
    console.log(error);
    throw error;
  }
};

/**
 * Fonction asynchrone pour supprimer un créneau horaire spécifique dans le planning.
 *
 * @async
 * @function
 * @param {number} dayIndex - L'index du jour dans le tableau des jours.
 * @param {number} timeSlotIndex - L'index du créneau horaire dans le tableau des créneaux horaires.
 */
const removeTimeSlot = async (dayIndex, timeSlotIndex, period) => {
  try {
    // Récupération des données existantes depuis Firebase
    const docDatas = await fetchWeeklyPlanner(period);
    // Récupération du créneau horaire spécifique que vous souhaitez supprimer
    const targetTimeSlot = docDatas.days[dayIndex]['schedule'][timeSlotIndex];
    // Utilisation de la déconstruction pour extraire les propriétés à conserver
    const { ...remainingProperties } = targetTimeSlot;
    const propertiesToRemove = [
      'cellBg',
      'duration',
      'endTime',
      'startTime',
      'title',
    ];
    // Suppression des propriétés spécifiées des propriétés restantes
    for (const propToRemove of propertiesToRemove) {
      delete remainingProperties[propToRemove];
    }
    // Mise à jour du créneau horaire avec les nouvelles données
    const updatedTimeSlot = {
      ...remainingProperties,
      timeSlot: targetTimeSlot.timeSlot,
      available: true,
    };
    // Mise à jour du créneau horaire spécifique dans le tableau des jours
    docDatas.days[dayIndex]['schedule'][timeSlotIndex] = updatedTimeSlot;
    await updateDoc(doc(db, `${period}WeeklyPlanner`, 'schedule'), docDatas);
    sessionStorage.removeItem(`${period}WeeklyPlanner`);
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchWeeklyPlanner,
  updateTimeSlot,
  addDays,
  removeTimeSlot,
  updateHolidayDates,
};
