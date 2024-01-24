import {
  getDocs,
  doc,
  updateDoc,
  collection,
  query,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';

const fetchSchoolTimeWeeklyPlannerApi = async (day) => {
  try {
    const dayCollectionQuery = query(
      collection(db, 'schoolTimeWeeklyPlanner', 'weeklyPlanner', day)
    );
    const dayCollectionSnapshot = await getDocs(dayCollectionQuery);
    const formattedDatas = dayCollectionSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return formattedDatas;
  } catch (error) {
    console.log(error);
  }
};

const updateTimeSlot = async (docId, datas, type) => {
  try {
    await updateDoc(doc(db, 'skills', docId), datas);
    sessionStorage.removeItem(`${type}skills`);
  } catch (error) {
    console.log(error);
  }
};

const addTimeSlot = async (docId, datas, type) => {
  try {
    await setDoc(doc(db, 'skills', docId), datas);
    sessionStorage.removeItem(`${type}skills`);
  } catch (error) {
    console.log(error);
  }
};

const removeTimeSlot = async (docId, type) => {
  try {
    await deleteDoc(doc(db, 'skills', docId));
    sessionStorage.removeItem(`${type}skills`);
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchSchoolTimeWeeklyPlannerApi,
  updateTimeSlot,
  addTimeSlot,
  removeTimeSlot,
};
