import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
import Modal from '../layouts/Modal';
import { useEffect } from 'react';
import { adminEditButtonClassname } from '../utils/GeneralClassNames';
import { sectionTitleClassName } from '../utils/GeneralClassNames';
import PensionPricesForm from '../components/admin/forms/PensionPricesForm';

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
   * Function to retrieve prices from the API.
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

  return (
    <section className='p-2 pt-6 lg:p-16 sm:p-8' id='prices'>
      {editable ? (
        <h3 className={sectionTitleClassName}>Nos tarifs</h3>
      ) : (
        <h2 className={sectionTitleClassName}>Nos tarifs</h2>
      )}
      <p className='italic'>(Bientôt disponible)</p>
      <div className='py-4'>
        {/* Price edit button (visible only in edit mode) */}
        {editable && (
          <button
            onClick={() => setModalOpen(true)}
            className={adminEditButtonClassname}
          >
            Modifier
          </button>
        )}
      </div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          title={'Gestion des tarifs'}
        >
          <PensionPricesForm
            pensionPrices={pensionPrices}
            setModalOpen={setModalOpen}
            getPrices={getPrices}
          />
        </Modal>
      )}
    </section>
  );
};

PensionPrices.propTypes = {
  editable: PropTypes.bool,
};

export default PensionPrices;
