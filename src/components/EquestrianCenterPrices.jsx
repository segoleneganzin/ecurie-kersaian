import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
import Modal from '../layouts/Modal';
import { useEffect } from 'react';
import GeneralPrices from './GeneralPrices';
import EquestrianCenterPricesForm from '../components/admin/forms/EquestrianCenterPricesForm';
import { adminEditButtonClassname } from '../utils/GeneralClassNames';
import Section from '../layouts/Section';
import PackagePricesTable from './pricesTables/PackagePricesTable';
import CardPricesTable from './pricesTables/CardPricesTable';
import PensionPricesTable from './pricesTables/PensionPricesTable';

/**
 * EquestrianCenterPrices component to display equestrian center prices.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.editable
 * @returns {JSX.Element}
 */
const EquestrianCenterPrices = ({ editable = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState({
    equestrianCenterPrices: null,
    pensionPrices: null,
  });
  const SubitleTag = editable ? 'h5' : 'h4';
  const classNames = {
    pricesSectionSubtitles:
      'font-bold text-xl bg-secondary-color text-white rounded-lg text-center',
    tableContainer:
      'rounded-lg overflow-hidden border-2 border-secondary-color w-fit m-auto md:m-0',
    table: 'text-sm mobile:text-base',
    tableHead: 'bg-secondary-color text-white',
    tableHeadData: 'p-2 border-r border-white text-center',
    tableDataLastRow: 'py-2 px-4 ',
    tableData: 'py-2 px-4 border-r border-secondary-color',
    tableRow: 'h-16 text-left border-b border-secondary-color',
  };
  const pricesSectionSubtitlesClassName =
    'font-bold text-xl bg-secondary-color text-white  rounded-lg text-center';
  /**
   * Function to retrieve prices from the API.
   * @async
   * @function
   */
  const getPrices = async () => {
    const equestrianCenterPricesDb = await fetchPricesByCategory(
      'equestrianCenter'
    );
    const pensionPricesDb = await fetchPricesByCategory('pension');
    setState({
      equestrianCenterPrices: equestrianCenterPricesDb,
      pensionPrices: pensionPricesDb,
    });
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <Section editable={editable} title={'Nos tarifs'} id={'prices'}>
      <>
        {/* general prices */}
        <GeneralPrices editable={editable} />
        {/* Packages */}
        <div className='py-4'>
          {/* Price edit button (visible only in edit mode) */}
          {editable && (
            <button
              onClick={() => setModalOpen(true)}
              className={adminEditButtonClassname}
            >
              Modifier les tarifs du centre équestre
            </button>
          )}
        </div>
        {state.equestrianCenterPrices && (
          <>
            <SubitleTag className={pricesSectionSubtitlesClassName}>
              Forfaits annuels
            </SubitleTag>
            <PackagePricesTable
              frequency={'annual'}
              prices={state.equestrianCenterPrices}
              classNames={classNames}
            />
            <SubitleTag className={pricesSectionSubtitlesClassName}>
              Forfaits trimestriels
            </SubitleTag>
            <PackagePricesTable
              frequency={'quarterly'}
              prices={state.equestrianCenterPrices}
              classNames={classNames}
            />{' '}
            {/* Cards */}
            <SubitleTag className={pricesSectionSubtitlesClassName}>
              Cartes
            </SubitleTag>
            <CardPricesTable
              prices={state.equestrianCenterPrices}
              classNames={classNames}
            />
          </>
        )}
        {/* half and third part pension */}
        {state.pensionPrices && (
          <>
            <SubitleTag className={pricesSectionSubtitlesClassName}>
              Demi pension et tiers de pension
            </SubitleTag>
            <PensionPricesTable
              prices={state.pensionPrices}
              classNames={classNames}
            />
          </>
        )}
        {editable && (
          <div className='py-4'>
            {/* Price edit button (visible only in edit mode) */}
            <button
              onClick={() => setModalOpen(true)}
              className={adminEditButtonClassname}
            >
              Modifier les tarifs du centre équestre
            </button>
          </div>
        )}
        {/* edit prices modal */}
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            title={'Gestion des tarifs'}
          >
            <EquestrianCenterPricesForm
              equestrianCenterPrices={state.equestrianCenterPrices}
              pensionPrices={state.pensionPrices}
              getPrices={getPrices}
              setModalOpen={setModalOpen}
            />
          </Modal>
        )}
      </>
    </Section>
  );
};

EquestrianCenterPrices.propTypes = {
  editable: PropTypes.bool,
};

export default EquestrianCenterPrices;
