import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
import Modal from './Modal';
import { useEffect } from 'react';
import { adminEditButtonClassname } from '../utils/GeneralClassNames';
import { sectionTitleClassName } from '../utils/GeneralClassNames';
/**
 * Composant PensionPrices pour afficher les tarifs du centre équestre.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.editable - Indique si le mode édition est activé.
 * @returns {JSX.Element} - L'élément JSX du composant PensionPrices.
 */
const PensionPrices = ({ editable = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pensionPrices, setPensionPrices] = useState(null);

  /**
   * Fonction pour récupérer les tarifs depuis l'API.
   *
   * @async
   * @function
   */
  const getPrices = async () => {
    const pensionPricesDb = await fetchPricesByCategory('pension');
    setPensionPrices(pensionPricesDb);
  };

  // Utilisation de useEffect pour récupérer les tarifs lors du rendu initial
  useEffect(() => {
    getPrices();
  }, []);

  /**
   * Fonction pour ouvrir la modal d'édition.
   *
   * @function
   */
  const openModal = () => {
    if (!editable) return;
    setModalOpen(true);
  };

  // Rendu du composant PensionPrices
  return (
    <section className='p-2 pt-6 lg:p-16 sm:p-8' id='prices'>
      {editable ? (
        <h3 className={sectionTitleClassName}>Les tarifs</h3>
      ) : (
        <h2 className={sectionTitleClassName}>Les tarifs</h2>
      )}
      <p className='italic'>(Bientôt disponible)</p>
      <div className='py-4'>
        {editable ? (
          <button onClick={openModal} className={adminEditButtonClassname}>
            Modifier
          </button>
        ) : (
          ''
        )}
      </div>
      {/* Modal pour l'édition des tarifs */}
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          type={'pension'}
          pensionPrices={pensionPrices}
          getPrices={getPrices}
        />
      )}
    </section>
  );
};

// Définition des types des propriétés du composant
PensionPrices.propTypes = {
  editable: PropTypes.bool,
};

export default PensionPrices;
