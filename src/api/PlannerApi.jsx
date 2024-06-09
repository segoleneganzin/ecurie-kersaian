import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

/**
 * Asynchronous function to retrieve weekly planner picture data from Firebase.
 * @async
 * @function
 * @returns {Promise<Object>} - The weekly planner picture data.
 */
const fetchPlannerApi = async () => {
  try {
    const querySnapshot = await getDoc(
      doc(db, `holidayWeeklyPlanner`, 'planner')
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

const updatePlannerApi = async (datas) => {
  try {
    // Using the updateDoc function to update a specific document
    await updateDoc(doc(db, 'holidayWeeklyPlanner', 'planner'), datas);
    sessionStorage.removeItem(`holidayWeeklyPlanner`);
  } catch (error) {
    // Error handling by logging the error to the console
    console.log(error);
    throw error;
  }
};

export { fetchPlannerApi, updatePlannerApi };
