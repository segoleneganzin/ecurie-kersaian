import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * Asynchronous function to retrieve weekly planner data from Firebase.
 *
 * @async
 * @function
 * @returns {Promise<Object>} - The weekly planner data.
 */
const fetchWeeklyPlanner = async (period) => {
  sessionStorage.removeItem(`${period}WeeklyPlanner`);
  try {
    const querySnapshot = await getDoc(
      doc(db, `${period}WeeklyPlanner`, 'schedule')
    );
    return querySnapshot.data();
    // if (window.sessionStorage.getItem(`${period}WeeklyPlanner`) === null) {
    //   // console.log(`${period} weekly planner not cached`);
    //   const querySnapshot = await getDoc(
    //     doc(db, `${period}WeeklyPlanner`, 'schedule')
    //   );
    //   sessionStorage.setItem(
    //     `${period}WeeklyPlanner`,
    //     JSON.stringify(querySnapshot.data())
    //   );
    //   return querySnapshot.data();
    // } else {
    //   // console.log(`${period} weekly planner already cached`);
    //   return JSON.parse(
    //     window.sessionStorage.getItem(`${period}WeeklyPlanner`)
    //   );
    // }
  } catch (error) {
    console.log(error);
  }
};

/**
 * Asynchronous function to add days to the weekly planner in Firebase.
 *
 * @async
 * @function
 * @param {Object} datas - The day data to add.
 */
const addDays = async (datas, period) => {
  try {
    await setDoc(doc(db, `${period}WeeklyPlanner`, 'schedule'), datas);
    sessionStorage.removeItem(`${period}WeeklyPlanner`);
  } catch (error) {
    console.log(error);
  }
};
// ****** code to automatically create default data (to be used in the WeeklyPlanner file)
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
 * Asynchronous function to update a specific time slot in the planner.
 *
 * @async
 * @function
 * @param {number} dayIndex - The index of the day in the days array.
 * @param {number} timeSlotIndex - The index of the time slot in the time slots array.
 * @param {Object} datas - The new data of the time slot.
 */
const updateTimeSlot = async (dayIndex, timeSlotIndex, { datas }, period) => {
  try {
    // Fetching existing data from Firebase
    const docDatas = await fetchWeeklyPlanner(period);
    // Retrieving the specific time slot you want to update
    const targetTimeSlot = docDatas.days[dayIndex]['schedule'][timeSlotIndex];
    // Updating the time slot with the new data
    const updatedTimeSlot = {
      ...targetTimeSlot,
      ...datas,
    };
    // Updating the specific time slot in the days array
    docDatas.days[dayIndex]['schedule'][timeSlotIndex] = updatedTimeSlot;
    await updateDoc(doc(db, `${period}WeeklyPlanner`, 'schedule'), docDatas);
    sessionStorage.removeItem(`${period}WeeklyPlanner`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates holiday dates in the "holidayWeeklyPlanner" collection.
 *
 * @async
 * @function
 * @param {Array<string>} dates - The new holiday dates to update.
 * @throws {Error} An error if updating dates fails.
 */
const updateHolidayInfos = async (infos) => {
  try {
    // Using the updateDoc function to update holiday dates
    await updateDoc(doc(db, `holidayWeeklyPlanner`, 'schedule'), {
      infos: infos,
    });
    sessionStorage.removeItem(`holidayWeeklyPlanner`);
  } catch (error) {
    // Error handling by logging the error to the console
    console.log(error);
    throw error;
  }
};

/**
 * Asynchronous function to remove a specific time slot from the planner.
 *
 * @async
 * @function
 * @param {number} dayIndex - The index of the day in the days array.
 * @param {number} timeSlotIndex - The index of the time slot in the time slots array.
 */
const removeTimeSlot = async (dayIndex, timeSlotIndex, period) => {
  try {
    // Fetching existing data from Firebase
    const docDatas = await fetchWeeklyPlanner(period);
    // Retrieving the specific time slot you want to remove
    const targetTimeSlot = docDatas.days[dayIndex]['schedule'][timeSlotIndex];
    // Using destructuring to extract properties to keep
    const { ...remainingProperties } = targetTimeSlot;
    const propertiesToRemove = [
      'cellBg',
      'duration',
      'endTime',
      'startTime',
      'title',
    ];
    // Removing specified properties from remaining properties
    for (const propToRemove of propertiesToRemove) {
      delete remainingProperties[propToRemove];
    }
    // Updating the time slot with the new data
    const updatedTimeSlot = {
      ...remainingProperties,
      timeSlot: targetTimeSlot.timeSlot,
      available: true,
    };
    // Updating the specific time slot in the days array
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
  updateHolidayInfos,
};
