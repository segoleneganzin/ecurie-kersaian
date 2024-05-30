import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from '../layouts/Modal';
import { fetchPricesByCategory } from '../api/PricesApi';
import { adminEditButtonClassname } from '../utils/GeneralClassNames';
import GeneralPricesForm from '../components/admin/forms/GeneralPricesForm';

/**
 * GeneralPrices component
 * @param {Object} props
 * @param {boolean} props.editable
 * @returns {JSX.Element}
 */
const GeneralPrices = ({ editable = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [generalPrices, setGeneralPrices] = useState(null);

  /**
   * Function to retrieve prices from the API.
   * @async
   * @function
   */
  const getGeneralPrices = async () => {
    const generalPricesDb = await fetchPricesByCategory('general');
    setGeneralPrices(generalPricesDb);
  };

  // Recover general prices on component mount
  useEffect(() => {
    getGeneralPrices();
  }, []);

  const openModal = () => {
    if (!editable) return;
    setModalOpen(true);
  };

  return (
    <>
      {editable ? (
        <h4 className='text-principal-color font-bold text-2xl'>
          Saison {generalPrices && generalPrices['season']}
        </h4>
      ) : (
        <h3 className='text-principal-color font-bold text-2xl'>
          Saison {generalPrices && generalPrices['season']}
        </h3>
      )}

      {/* Price edit button (visible only in edit mode) */}
      {editable ? (
        <button onClick={openModal} className={adminEditButtonClassname}>
          Modifier les tarifs généraux
        </button>
      ) : (
        ''
      )}

      <ul className='py-4 md:flex md:gap-16 md:justify-center md:border-2 border-green-800 rounded-lg md:mt-2'>
        <li className='text-base'>
          <span className='font-bold text-xl'>Cotisation annuelle :</span>{' '}
          {generalPrices && generalPrices['annualSubscription']}€
        </li>
        <li className='text-base'>
          <span className='font-bold text-xl'>Licence annuelle FFE :</span>
          <ul className='text-center'>
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

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          title={'Gestion des tarifs'}
        >
          <GeneralPricesForm
            generalPrices={generalPrices}
            getGeneralPrices={getGeneralPrices}
          />
        </Modal>
      )}
    </>
  );
};

GeneralPrices.propTypes = {
  editable: PropTypes.bool,
};

export default GeneralPrices;
