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
    const querySnapshot = await getDoc(
      doc(db, `${period}WeeklyPlanner`, 'schedule')
    );
    return querySnapshot.data();
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export { fetchWeeklyPlanner, updateTimeSlot, addDays, removeTimeSlot };
