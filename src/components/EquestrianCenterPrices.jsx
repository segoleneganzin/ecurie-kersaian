import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
import Modal from '../layouts/Modal';
import { useEffect } from 'react';
import GeneralPrices from './GeneralPrices';
import EquestrianCenterPricesForm from '../components/admin/forms/EquestrianCenterPricesForm';
import { adminEditButtonClassname } from '../utils/GeneralClassNames';
import Section from '../layouts/Section';

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
  const pricesSectionSubtitlesClassName =
    'font-bold text-xl bg-secondary-color text-white  rounded-lg text-center';
  const tableContainerClassName =
    'rounded-lg overflow-hidden border-2 border-secondary-color w-fit m-auto md:m-0';
  const tableClassName = 'text-sm mobile:text-base';
  const tableHeadClassName = 'bg-secondary-color text-white';
  const tableHeadDataClassName = 'p-2 border-r border-white text-center';
  const tableDataLastRowClassName = 'py-2 px-4 ';
  const tableDataClassName =
    tableDataLastRowClassName + ' border-r border-secondary-color';
  const tableRowClassName = 'h-16 text-left border-b border-secondary-color';

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
        <SubitleTag className={pricesSectionSubtitlesClassName}>
          Forfaits &lsquo;tout compris&rsquo; (Adhésion + licence + cours)
        </SubitleTag>
        <div className='py-4 md:flex md:justify-between'>
          {/* packages infos */}
          <div className='md:max-w-[300px] lg:max-w-full'>
            <p className='font-bold'>
              {state.equestrianCenterPrices &&
                state.equestrianCenterPrices['period']}
            </p>
            <p className='italic text-base mr-2 '>
              {state.equestrianCenterPrices &&
                state.equestrianCenterPrices['infos']}{' '}
              <br />
              Pas de cours durant les vacances scolaires.
            </p>
          </div>
          {/* package table prices */}
          <div className={tableContainerClassName + ' mt-2'}>
            <table className={tableClassName}>
              <thead className={tableHeadClassName}>
                <tr className={tableRowClassName}>
                  <th className={tableHeadDataClassName + ' text-left'}>
                    Formules
                  </th>
                  <th className={tableHeadDataClassName}>Baby</th>
                  <th className={tableHeadDataClassName}>- de 18ans</th>
                  <th className={tableHeadDataClassName + ' border-r-0'}>
                    + de 18ans
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={tableRowClassName}>
                  <th className={tableDataClassName}>1h/semaine</th>
                  <td className={tableDataClassName}>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['oneHourWeekly']['baby']}
                    €
                  </td>
                  <td className={tableDataClassName}>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['oneHourWeekly']['under18']}
                    €
                  </td>
                  <td className={tableDataLastRowClassName}>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['oneHourWeekly']['over18']}
                    €
                  </td>
                </tr>
                <tr className={tableRowClassName + ' border-b-0'}>
                  <th className={tableDataClassName}>2h/semaine</th>
                  <td
                    className={tableDataClassName + ' bg-secondary-color'}
                  ></td>
                  <td className={tableDataClassName}>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['twoHoursWeekly']['under18']}
                    €
                  </td>
                  <td className={tableDataLastRowClassName}>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['twoHoursWeekly']['over18']}
                    €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Cards */}
        <div className='py-4'>
          <SubitleTag className={pricesSectionSubtitlesClassName}>
            Cartes
          </SubitleTag>
          <div className='py-4 md:flex md:justify-between'>
            {/* cards infos */}
            <p className='italic py-4 font-sm'>
              Cotisation et licence obligatoires (non comprises).
            </p>
            {/* cards table prices */}
            <div className={tableContainerClassName}>
              <table className={tableClassName}>
                <thead className={tableHeadClassName}>
                  <tr className={tableRowClassName}>
                    <th className={tableHeadDataClassName}>Cartes</th>
                    <th className={tableHeadDataClassName + ' border-r-0'}>
                      Tarifs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={tableRowClassName}>
                    <th
                      className='py-2 px-4 border-b-2 border-secondary-color'
                      colSpan='2'
                    >
                      Cours collectifs
                    </th>
                  </tr>
                  <tr className={tableRowClassName}>
                    <th className={tableDataClassName}>5 heures</th>
                    <td className={tableDataLastRowClassName}>
                      {state.equestrianCenterPrices &&
                        state.equestrianCenterPrices['cardGroupLessons'][
                          'fiveHours'
                        ]}
                      €
                    </td>
                  </tr>
                  <tr className={tableRowClassName}>
                    <th className={tableDataClassName}>10 heures</th>
                    <td className={tableDataLastRowClassName}>
                      {state.equestrianCenterPrices &&
                        state.equestrianCenterPrices['cardGroupLessons'][
                          'tenHours'
                        ]}
                      €
                    </td>
                  </tr>
                  <tr className={tableRowClassName}>
                    <th
                      className='py-2 px-4 border-t-2 border-b-2 border-secondary-color'
                      colSpan='2'
                    >
                      Cours particuliers
                    </th>
                  </tr>
                  <tr className={tableRowClassName}>
                    <th className={tableDataClassName}> 5 cours club</th>
                    <td className={tableDataLastRowClassName}>
                      {state.equestrianCenterPrices &&
                        state.equestrianCenterPrices['cardPrivatesLessons'][
                          'fiveClubLessons'
                        ]}
                      €
                    </td>
                  </tr>
                  <tr className={tableRowClassName + ' border-b-0'}>
                    <th className={tableDataClassName}>5 cours propriétaire</th>
                    <td className={tableDataLastRowClassName}>
                      {state.equestrianCenterPrices &&
                        state.equestrianCenterPrices['cardPrivatesLessons'][
                          'fiveOwnerLessons'
                        ]}
                      €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* half and third part pension */}
        <div className='py-4'>
          <SubitleTag className={pricesSectionSubtitlesClassName}>
            Demi pension et tiers de pension
          </SubitleTag>
          <div className='py-4 w-fit m-auto lg:m-0 lg:w-full lg:flex lg:justify-between'>
            {/* Infos */}
            <div>
              <p className='font-bold text-base'>
                (En fonction des chevaux disponibles)
              </p>
              <p className='italic py-4 text-base'>
                Cotisation et licence obligatoires (non comprises).
                <br />
                La monte libre exclut la pratique de l&apos;obstacle.
              </p>
            </div>
            {/* Table prices */}
            <div className={tableContainerClassName}>
              <table className={tableClassName}>
                <thead className={tableHeadClassName}>
                  <tr className={tableRowClassName}>
                    <th className={tableHeadDataClassName}>Formules</th>
                    <th className={tableHeadDataClassName}>Descriptions</th>
                    <th className={tableDataLastRowClassName}>Tarif mensuel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={tableRowClassName}>
                    <th className={tableDataClassName}>Tiers de pension</th>
                    <td className={tableDataClassName}>
                      {state.pensionPrices &&
                        state.pensionPrices['thirdPartPension']['description']}
                    </td>
                    <td className={tableDataLastRowClassName}>
                      {' '}
                      {state.pensionPrices &&
                        state.pensionPrices['thirdPartPension']['price']}
                      €
                    </td>
                  </tr>
                  <tr className={tableRowClassName + ' border-b-0'}>
                    <th className={tableDataClassName}>Demi pension</th>
                    <td className={tableDataClassName}>
                      {state.pensionPrices &&
                        state.pensionPrices['halfPension']['description']}
                    </td>
                    <td className={tableDataLastRowClassName}>
                      {' '}
                      {state.pensionPrices &&
                        state.pensionPrices['halfPension']['price']}
                      €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
