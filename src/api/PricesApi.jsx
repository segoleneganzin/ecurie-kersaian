import {
  getDocs,
  getDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase-config';

const fetchPrices = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, `prices`));
    const formattedDatas = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return formattedDatas;
  } catch (error) {
    console.log(error);
  }
};

const fetchPricesByCategory = async (category) => {
  try {
    const querySnapshot = await getDoc(doc(db, `prices`, category));
    return querySnapshot.data();
  } catch (error) {
    console.log(error);
  }
};

const updatePrices = async (category, datas) => {
  try {
    await updateDoc(doc(db, 'prices', category), datas);
  } catch (error) {
    console.log(error);
  }
};

export { fetchPrices, updatePrices, fetchPricesByCategory };
