// Importation des fonctions Firestore nécessaires depuis la bibliothèque firebase
import { getDoc, doc, updateDoc } from 'firebase/firestore';

// Importation de l'instance de la base de données Firestore depuis un fichier de configuration
import { db } from '../firebase-config';

/**
 * Récupère les données d'un document dans la collection "prices" en fonction de la catégorie.
 *
 * @async
 * @function
 * @param {string} category - La catégorie du prix à récupérer.
 * @returns {Promise<Object>} Les données du document spécifié.
 * @throws {Error} Une erreur si la récupération des données échoue.
 */
const fetchPricesByCategory = async (category) => {
  try {
    // Utilisation de la fonction getDoc pour obtenir un snapshot d'un document spécifique
    const querySnapshot = await getDoc(doc(db, `prices`, category));

    // Retourne les données du document spécifique
    return querySnapshot.data();
  } catch (error) {
    // Gestion des erreurs en affichant l'erreur dans la console
    console.log(error);
    throw error;
  }
};

/**
 * Met à jour les données d'un document dans la collection "prices" en fonction de la catégorie.
 *
 * @async
 * @function
 * @param {string} category - La catégorie du prix à mettre à jour.
 * @param {Object} datas - Les nouvelles données à mettre à jour dans le document.
 * @throws {Error} Une erreur si la mise à jour des données échoue.
 */
const updatePrices = async (category, datas) => {
  try {
    // Utilisation de la fonction updateDoc pour mettre à jour un document spécifique
    await updateDoc(doc(db, 'prices', category), datas);
  } catch (error) {
    // Gestion des erreurs en affichant l'erreur dans la console
    console.log(error);
    throw error;
  }
};

// Exportation des fonctions pour les utiliser dans d'autres fichiers/modules
export { updatePrices, fetchPricesByCategory };
