/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
import AdminPricesModal from './AdminPricesModal';
import { useEffect } from 'react';
import GeneralPrices from './GeneralPrices';

const EquestrianCenterPrices = ({ editable = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState({
    equestrianCenterPrices: null,
    pensionPrices: null,
  });

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

  // eslint-disable-next-line no-unused-vars
  const openModal = () => {
    if (!editable) return;
    setModalOpen(true);
  };
  return (
    <div className='p-2 pt-6 lg:p-16 sm:p-8' id='prices'>
      <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Les tarifs
      </h2>
      <h3 className='font-bold text-2xl'>Saison 2023/2024</h3>

      <GeneralPrices editable={editable} />

      {/* Forfaits */}
      <div className='py-4'>
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

        <h4 className='font-bold text-xl'>
          Forfaits "tout compris" (Adhésion + licence + cours)
        </h4>
        <div className='py-4'>
          <h5 className='font-bold'>Du 1er septembre au 6 juillet</h5>
          <p className='italic text-sm '>
            Cette année, exceptionnellement, les cours auront lieu du 9 octobre
            au 6 juillet. <br />
            Pas de cours durant les vacances scolaires.
          </p>
        </div>
        <table className='bg-white border-2 border-principal-color text-xs mobile:text-base'>
          <thead className='bg-principal-color border border-principal-color text-white'>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-white'>Formules</th>
              <th className='py-2 px-4 border border-white'>Baby</th>
              <th className='py-2 px-4 border border-white'>- de 18ans</th>
              <th className='py-2 px-4 border border-white'>+ de 18ans</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                1h/semaine
              </th>
              <td className='py-2 px-4 border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['oneHourWeekly']['baby']}
                €
              </td>
              <td className='py-2 px-4 border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['oneHourWeekly']['under18']}
                €
              </td>
              <td className='py-2 px-4 border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['oneHourWeekly']['over18']}
                €
              </td>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                2h/semaine
              </th>
              <td className='py-2 px-4 bg-principal-color border border-principal-color'></td>
              <td className='py-2 px-4 border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['twoHoursWeekly']['under18']}
                €
              </td>
              <td className='py-2 px-4 border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['twoHoursWeekly']['over18']}
                €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Cartes */}
      <div className='py-4'>
        <h4 className='font-bold text-xl'>Cartes</h4>
        <p className='italic py-4 font-sm'>
          Cotisation et licence obligatoire (non comprises)
        </p>
        <table className='bg-white border-2 border-principal-color text-xs mobile:text-base'>
          <thead className='bg-principal-color text-white'>
            <tr className='h-16  text-left'>
              <th className='py-2 px-4 border border-white'>Cartes</th>
              <th className='py-2 px-4 border border-white'>Tarifs</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-left'>
              <th
                className='py-2 px-4 border-2 border-principal-color'
                colSpan='2'
              >
                Cours collectifs
              </th>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                5 heures
              </th>
              <td className='py-2 px-4  border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['cardGroupLessons']['fiveHours']}
                €
              </td>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                10 heures
              </th>
              <td className='py-2 px-4  border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['cardGroupLessons']['tenHours']}
                €
              </td>
            </tr>
            <tr className='h-16 text-left'>
              <th
                className='py-2 px-4 border-2 border-principal-color'
                colSpan='2'
              >
                Cours particuliers
              </th>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                5 cours club
              </th>
              <td className='py-2 px-4  border border-principal-color'>
                {state.equestrianCenterPrices &&
                  state.equestrianCenterPrices['cardPrivatesLessons'][
                    'fiveClubLessons'
                  ]}
                €
              </td>
            </tr>
            <tr className='h-16'>
              <th className='py-2 px-4 border border-principal-color'>
                5 cours propriétaire
              </th>
              <td className='py-2 px-4  border border-principal-color'>
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
      {/* Demi et tiers de pension */}
      <div className='py-4'>
        <h4 className='font-bold text-xl'>Demi pension et tiers de pension</h4>
        <div className='py-4'>
          <p className='font-bold text-sm'>
            (En fonction des chevaux disponibles)
          </p>
          <p className='italic py-4 text-sm'>
            Cotisation et licence obligatoire (non comprises).
            <br />
            La monte libre exclus la pratique de l'obstacle.
          </p>
        </div>
        <table className='bg-white border-2 border-principal-color text-xs mobile:text-base'>
          <thead className='bg-principal-color border border-principal-color text-white'>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-white'>Formules</th>
              <th className='py-2 px-4 border border-white'>Descriptions</th>
              <th className='py-2 px-4 border border-white'>Tarif mensuel</th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                Tiers de pension
              </th>
              <td className='py-2 px-4 border border-principal-color'>
                {state.pensionPrices &&
                  state.pensionPrices['thirdPartPension']['description']}
              </td>
              <td className='py-2 px-4 border border-principal-color'>
                {' '}
                {state.pensionPrices &&
                  state.pensionPrices['thirdPartPension']['price']}
                €
              </td>
            </tr>
            <tr className='h-16 text-left'>
              <th className='py-2 px-4 border border-principal-color'>
                Demi pension
              </th>
              <td className='py-2 px-4 border border-principal-color'>
                {state.pensionPrices &&
                  state.pensionPrices['halfPension']['description']}
              </td>
              <td className='py-2 px-4 border border-principal-color'>
                {' '}
                {state.pensionPrices &&
                  state.pensionPrices['halfPension']['price']}
                €
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isModalOpen ? (
        <AdminPricesModal
          setModalOpen={setModalOpen}
          type={'equestrianCenter'}
          generalPrices={state.generalPrices}
          equestrianCenterPrices={state.equestrianCenterPrices}
          pensionPrices={state.pensionPrices}
          getPrices={getPrices}
        />
      ) : (
        ''
      )}
    </div>
  );
};
EquestrianCenterPrices.propTypes = {
  editable: PropTypes.bool,
};
export default EquestrianCenterPrices;
