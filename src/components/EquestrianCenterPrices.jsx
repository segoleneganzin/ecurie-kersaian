import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
import Modal from './Modal';
import { useEffect } from 'react';
import GeneralPrices from './GeneralPrices';
import {
  adminEditButtonClassname,
  tableDataClassName,
  tableDataLastRowClassName,
  tableHeadDataClassName,
  tableRowClassName,
  tableHeadClassName,
  pricesSectionSubtitlesClassName,
  tableClassName,
  tableContainerClassName,
  sectionTitleClassName,
} from '../utils/GeneralClassNames';
/**
 * Composant EquestrianCenterPrices pour afficher les tarifs du centre équestre.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {boolean} props.editable - Indique si le mode édition est activé.
 * @returns {JSX.Element} - L'élément JSX du composant EquestrianCenterPrices.
 */
const EquestrianCenterPrices = ({ editable = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState({
    equestrianCenterPrices: null,
    pensionPrices: null,
  });

  /**
   * Fonction pour récupérer les tarifs depuis l'API.
   *
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

  // Rendu du composant EquestrianCenterPrices
  return (
    <section className='p-2 pt-6 lg:p-16 sm:p-8' id='prices'>
      {editable ? (
        <h3 className={sectionTitleClassName}>Les tarifs</h3>
      ) : (
        <h2 className={sectionTitleClassName}>Les tarifs</h2>
      )}
      {/* Affichage des tarifs généraux */}
      <GeneralPrices editable={editable} />
      {/* Forfaits */}
      <div className='py-4'>
        {editable ? (
          <button onClick={openModal} className={adminEditButtonClassname}>
            Modifier les tarifs du centre équestre
          </button>
        ) : (
          ''
        )}
      </div>
      {editable ? (
        <h5 className={pricesSectionSubtitlesClassName}>
          Forfaits &lsquo;tout compris&rsquo; (Adhésion + licence + cours)
        </h5>
      ) : (
        <h4 className={pricesSectionSubtitlesClassName}>
          Forfaits &lsquo;tout compris&rsquo; (Adhésion + licence + cours)
        </h4>
      )}
      <div className='py-4 md:flex  md:justify-between'>
        {/* Informations sur les forfaits */}
        <div className='md:max-w-300px lg:max-w-full'>
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
        {/* Tableau des tarifs des forfaits */}
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
              {/* Lignes du tableau des tarifs des forfaits */}
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
                <td className={tableDataClassName + ' bg-secondary-color'}></td>
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
      {/* Cartes */}
      <div className='py-4'>
        {editable ? (
          <h5 className={pricesSectionSubtitlesClassName}>Cartes</h5>
        ) : (
          <h4 className={pricesSectionSubtitlesClassName}>Cartes</h4>
        )}

        <div className='py-4 md:flex  md:justify-between'>
          {/* Informations sur les cartes */}
          <p className='italic py-4 font-sm'>
            Cotisation et licence obligatoires (non comprises).
          </p>
          {/* Tableau des tarifs des cartes */}
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
                {/* Lignes du tableau des tarifs des cartes */}
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
      {/* Demi et tiers de pension */}
      <div className='py-4'>
        {editable ? (
          <h5 className={pricesSectionSubtitlesClassName}>
            Demi pension et tiers de pension
          </h5>
        ) : (
          <h4 className={pricesSectionSubtitlesClassName}>
            Demi pension et tiers de pension
          </h4>
        )}

        <div className='py-4 lg:flex lg:justify-between w-fit m-auto lg:m-0 lg:w-full'>
          {/* Informations sur la demi et tiers pension */}
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
          {/* Tableau des tarifs de la demi et tiers pension */}
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
                {/* Lignes du tableau des tarifs de la demi et tiers pension */}
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
      <div className='py-4'>
        {editable ? (
          <button onClick={openModal} className={adminEditButtonClassname}>
            Modifier les tarifs du centre équestre
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
          type={'equestrianCenter'}
          generalPrices={state.generalPrices}
          equestrianCenterPrices={state.equestrianCenterPrices}
          pensionPrices={state.pensionPrices}
          getPrices={getPrices}
        />
      )}
    </section>
  );
};

// Définition des types des propriétés du composant
EquestrianCenterPrices.propTypes = {
  editable: PropTypes.bool,
};

export default EquestrianCenterPrices;
