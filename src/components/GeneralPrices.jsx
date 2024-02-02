import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { fetchPricesByCategory } from '../api/PricesApi';

/**
 * Composant GeneralPrices
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.editable - Indique si le composant est en mode édition.
 * @returns {JSX.Element} - Élément JSX représentant le composant GeneralPrices.
 */
const GeneralPrices = ({ editable = false }) => {
  // CLASSNAME
  const adminEditButtonClassname =
    'bg-lime-800 cursor-pointer p-2 rounded-lg shadow-lg text-white tracking-widest w-fit mb-2';

  const [isModalOpen, setModalOpen] = useState(false);
  const [generalPrices, setGeneralPrices] = useState(null);

  /**
   * Fonction qui récupère les prix généraux depuis la base de données.
   * @async
   * @function
   * @returns {Promise<void>} - Promesse résolue une fois que les prix généraux sont récupérés.
   */
  const getGeneralPrices = async () => {
    const generalPricesDb = await fetchPricesByCategory('general');
    setGeneralPrices(generalPricesDb);
  };

  // Effectuer la récupération des prix généraux au montage du composant
  useEffect(() => {
    getGeneralPrices();
  }, []);

  /**
   * Fonction pour ouvrir la modal d'édition des prix.
   */
  const openModal = () => {
    if (!editable) return;
    setModalOpen(true);
  };

  return (
    <div>
      {editable ? (
        <h4 className='text-principal-color font-bold text-2xl'>
          Saison {generalPrices && generalPrices['season']}
        </h4>
      ) : (
        <h3 className='text-principal-color font-bold text-2xl'>
          Saison {generalPrices && generalPrices['season']}
        </h3>
      )}

      {/* Bouton d'édition des prix (visible uniquement en mode édition) */}
      {editable ? (
        <button onClick={openModal} className={adminEditButtonClassname}>
          Modifier
        </button>
      ) : (
        ''
      )}

      {/* Liste des prix généraux */}
      <ul className='py-4 md:flex md:gap-16 md:justify-center md:border-2 border-green-800 rounded-lg md:mt-2'>
        <li className='text-base'>
          <span className='font-bold text-xl'>Cotisation annuelle :</span>{' '}
          {generalPrices && generalPrices['annualSubscription']}€
        </li>
        <li className='text-base'>
          <span className='font-bold text-xl'>Licence annuelle FFE :</span>
          <ul>
            <li>
              - de 18 ans :{' '}
              {generalPrices && generalPrices['ffeLicense']['under18']}€
            </li>
            <li>
              + de 18 ans :{' '}
              {generalPrices && generalPrices['ffeLicense']['over18']}€
            </li>
          </ul>
        </li>
      </ul>

      {/* Modal d'édition des prix (visible lorsqu'il est ouvert) */}
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          type={'general'}
          generalPrices={generalPrices}
          getPrices={getGeneralPrices}
        />
      )}
    </div>
  );
};

// Propriétés attendues par le composant
GeneralPrices.propTypes = {
  editable: PropTypes.bool,
};

export default GeneralPrices;
