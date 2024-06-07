// Importing necessary Firestore functions from the firebase library
import { getDoc, doc, updateDoc } from 'firebase/firestore';

// Importing the Firestore database instance from a configuration file
import { db } from '../firebase-config';

/**
 * Retrieves data from a document in the "prices" collection based on the category.
 *
 * @async
 * @function
 * @param {string} category - The category of the price to retrieve.
 * @returns {Promise<Object>} The data of the specified document.
 * @throws {Error} An error if data retrieval fails.
 */
const fetchPricesByCategory = async (category) => {
  // sessionStorage.clear();
  try {
    const querySnapshot = await getDoc(doc(db, `prices`, category));

    // if (window.sessionStorage.getItem(`${category}Prices`) === null) {
    //   // console.log(`${category} prices not cached`);
    //   const querySnapshot = await getDoc(doc(db, `prices`, category));
    //   sessionStorage.setItem(
    //     `${category}Prices`,
    //     JSON.stringify(querySnapshot.data())
    //   );
    return querySnapshot.data();
    // } else {
    //   // console.log(`${category} prices already cached`);
    //   return JSON.parse(window.sessionStorage.getItem(`${category}Prices`));
    // }
  } catch (error) {
    // Error handling by logging the error to the console
    console.log(error);
    throw error;
  }
};

/**
 * Updates data of a document in the "prices" collection based on the category.
 *
 * @async
 * @function
 * @param {string} category - The category of the price to update.
 * @param {Object} datas - The new data to update in the document.
 * @throws {Error} An error if data update fails.
 */
const updatePrices = async (category, datas) => {
  try {
    // Using the updateDoc function to update a specific document
    await updateDoc(doc(db, 'prices', category), datas);
    sessionStorage.removeItem(`${category}Prices`);
  } catch (error) {
    // Error handling by logging the error to the console
    console.log(error);
    throw error;
  }
};

// Exporting functions for use in other files/modules
export { updatePrices, fetchPricesByCategory };
