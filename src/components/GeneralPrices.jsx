import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import AdminPricesModal from './AdminPricesModal';
import { fetchPricesByCategory } from '../api/PricesApi';

const GeneralPrices = ({ editable = false }) => {
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
        <button
          onClick={openModal}
          className='bg-lime-800 cursor-pointer p-2 rounded-lg shadow-lg text-white tracking-widest w-fit'
        >
          Modifier
        </button>
      ) : (
        ''
      )}
      {/* General prices*/}
      <ul className='py-4'>
        <li className='text-sm'>
          <span className='font-bold text-xl'>Cotisation annuelle :</span>{' '}
          {generalPrices && generalPrices['annualSubscription']}€
        </li>
        <li className='text-sm'>
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
        <AdminPricesModal
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
