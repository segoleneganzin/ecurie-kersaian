/* eslint-disable no-unused-vars */
import { getDoc, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const fetchSchoolTimeWeeklyPlannerApi = async () => {
  try {
    const querySnapshot = await getDoc(
      doc(db, 'schoolWeeklyPlanner', 'schedule')
    );

    return querySnapshot.data();
  } catch (error) {
    console.log(error);
  }
};

const addDays = async (datas) => {
  try {
    await setDoc(doc(db, 'schoolWeeklyPlanner', 'schedule'), datas);
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
//   addDays(datas);
// };
// createDatas();
// ***************************************************************

const updateTimeSlot = async (dayIndex, timeSlotIndex, { datas }) => {
  try {
    // Récupération les données existantes depuis Firebase
    const docDatas = await fetchSchoolTimeWeeklyPlannerApi();
    // Récupération le timeSlot spécifique que vous souhaitez mettre à jour
    const targetTimeSlot = docDatas.days[dayIndex]['schedule'][timeSlotIndex];
    // Mise à jour le timeSlot avec les nouvelles données
    const updatedTimeSlot = {
      ...targetTimeSlot,
      ...datas,
    };
    // Mise à jour le timeSlot spécifique dans le tableau des jours
    docDatas.days[dayIndex]['schedule'][timeSlotIndex] = updatedTimeSlot;
    await updateDoc(doc(db, 'schoolWeeklyPlanner', 'schedule'), docDatas);
  } catch (error) {
    console.log(error);
  }
};

const removeTimeSlot = async (dayIndex, timeSlotIndex) => {
  try {
    // Récupération les données existantes depuis Firebase
    const docDatas = await fetchSchoolTimeWeeklyPlannerApi();
    // Récupération le timeSlot spécifique que vous souhaitez mettre à jour
    const targetTimeSlot = docDatas.days[dayIndex]['schedule'][timeSlotIndex];
    // Utilisez la déconstruction pour extraire les propriétés à conserver
    const { available, timeSlot, ...remainingProperties } = targetTimeSlot;
    const propertiesToRemove = [
      'cellBg',
      'duration',
      'endTime',
      'startTime',
      'title',
    ];
    // Supprimez les propriétés spécifiées à partir des propriétés restantes
    for (const propToRemove of propertiesToRemove) {
      delete remainingProperties[propToRemove];
    }
    // Mise à jour le timeSlot avec les nouvelles données
    const updatedTimeSlot = {
      ...remainingProperties,
      timeSlot: targetTimeSlot.timeSlot,
      available: true,
    };
    // Mise à jour le timeSlot spécifique dans le tableau des jours
    docDatas.days[dayIndex]['schedule'][timeSlotIndex] = updatedTimeSlot;
    await updateDoc(doc(db, 'schoolWeeklyPlanner', 'schedule'), docDatas);
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchSchoolTimeWeeklyPlannerApi,
  updateTimeSlot,
  addDays,
  removeTimeSlot,
};
