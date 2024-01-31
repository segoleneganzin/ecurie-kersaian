import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// import AdminPricesModal from './AdminPricesModal';
import Modal from './Modal';
import { fetchPricesByCategory } from '../api/PricesApi';

const GeneralPrices = ({ editable = false }) => {
  // CLASSNAME
  const adminEditButtonClassname =
    'bg-lime-800 cursor-pointer p-2 rounded-lg shadow-lg text-white tracking-widest w-fit mb-2';

  const [isModalOpen, setModalOpen] = useState(false);
  const [generalPrices, setGeneralPrices] = useState(null);

  const getGeneralPrices = async () => {
    const generalPricesDb = await fetchPricesByCategory('general');
    setGeneralPrices(generalPricesDb);
  };
  useEffect(() => {
    getGeneralPrices();
  }, []);

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

      {editable ? (
        <button onClick={openModal} className={adminEditButtonClassname}>
          Modifier
        </button>
      ) : (
        ''
      )}
      {/* General prices*/}
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
      {isModalOpen ? (
        <Modal
          setModalOpen={setModalOpen}
          type={'general'}
          generalPrices={generalPrices}
          getPrices={getGeneralPrices}
        />
      ) : (
        ''
      )}
    </div>
  );
};
GeneralPrices.propTypes = {
  editable: PropTypes.bool,
};
export default GeneralPrices;
