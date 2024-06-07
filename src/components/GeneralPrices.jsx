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
  const SubtitleTag = editable ? 'h4' : 'h3';

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

  return (
    <>
      <SubtitleTag className='text-principal-color font-bold text-2xl'>
        Saison {generalPrices && generalPrices['season']}
      </SubtitleTag>
      <p>
        Tarif spécial famille à partir de 2 cavaliers ➡ gratuité de la 2ème
        adhésion et 5% de remise sur les prestations.
      </p>
      {/* Price edit button (visible only in edit mode) */}
      {editable && (
        <button
          onClick={() => setModalOpen(true)}
          className={adminEditButtonClassname}
        >
          Modifier les tarifs généraux
        </button>
      )}

      <ul className='py-4 lg:flex lg:gap-16 lg:justify-center lg:border-2 border-green-800 rounded-lg lg:mt-2'>
        <li className='text-base'>
          <span className='font-bold text-xl'>Adhésion au club :</span>
          <ul className='text-center lg:text-left'>
            <li>
              Baby (3 et 4 ans) :{' '}
              {generalPrices && generalPrices['annualSubscription']['baby']}€
            </li>
            <li>
              - de 18 ans :{' '}
              {generalPrices && generalPrices['annualSubscription']['under18']}€
            </li>
            <li>
              + de 18 ans :{' '}
              {generalPrices && generalPrices['annualSubscription']['over18']}€
            </li>
          </ul>
        </li>
        <li className='text-base'>
          <span className='font-bold text-xl'>Licence annuelle FFE :</span>
          <ul className='text-center lg:text-left'>
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
        <li className='text-base'>
          <span className='font-bold text-xl'>Cours d&apos;essai :</span>
          <ul className='text-center lg:text-left'>
            <li>
              Baby (3 et 4 ans) :{' '}
              {generalPrices && generalPrices['trialLesson']['baby']}€
            </li>
            <li>
              - de 18 ans :{' '}
              {generalPrices && generalPrices['trialLesson']['under18']}€
            </li>
            <li>
              + de 18 ans :{' '}
              {generalPrices && generalPrices['trialLesson']['over18']}€
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
            setModalOpen={setModalOpen}
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
