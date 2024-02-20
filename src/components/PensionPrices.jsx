import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
import Modal from './Modal';
import { useEffect } from 'react';
import { adminEditButtonClassname } from '../utils/GeneralClassNames';
import { sectionTitleClassName } from '../utils/GeneralClassNames';
/**
 * PensionPrices component
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.editable
 * @returns {JSX.Element}
 */
const PensionPrices = ({ editable = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pensionPrices, setPensionPrices] = useState(null);

  /**
   * Function to retrieve rates from the API.
   * @async
   * @function
   */
  const getPrices = async () => {
    const pensionPricesDb = await fetchPricesByCategory('pension');
    setPensionPrices(pensionPricesDb);
  };

  // Recover general prices on component mount
  useEffect(() => {
    getPrices();
  }, []);

  const openModal = () => {
    if (!editable) return;
    setModalOpen(true);
  };

  return (
    <section className='p-2 pt-6 lg:p-16 sm:p-8' id='prices'>
      {editable ? (
        <h3 className={sectionTitleClassName}>Les tarifs</h3>
      ) : (
        <h2 className={sectionTitleClassName}>Les tarifs</h2>
      )}
      <p className='italic'>(Bientôt disponible)</p>
      <div className='py-4'>
        {/* Price edit button (visible only in edit mode) */}
        {editable ? (
          <button onClick={openModal} className={adminEditButtonClassname}>
            Modifier
          </button>
        ) : (
          ''
        )}
      </div>
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

PensionPrices.propTypes = {
  editable: PropTypes.bool,
};

export default PensionPrices;
