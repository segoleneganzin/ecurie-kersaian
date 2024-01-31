/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { fetchPricesByCategory } from '../api/PricesApi';
// import AdminPricesModal from './AdminPricesModal';
import Modal from './Modal';
import { useEffect } from 'react';
import GeneralPrices from './GeneralPrices';

const EquestrianCenterPrices = ({ editable = false }) => {
  // CLASSNAME
  const adminEditButtonClassname =
    'bg-lime-800 cursor-pointer p-2 rounded-lg shadow-lg text-white tracking-widest w-fit mb-2';

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

  const openModal = () => {
    if (!editable) return;
    setModalOpen(true);
  };
  return (
    <div className='p-2 pt-6 lg:p-16 sm:p-8' id='prices'>
      {editable ? (
        <h3 className='text-principal-color font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
          Les tarifs
        </h3>
      ) : (
        <h2 className='text-principal-color font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
          Les tarifs
        </h2>
      )}

      <GeneralPrices editable={editable} />

      {/* Forfaits */}
      <div className='py-4'>
        {editable ? (
          <button onClick={openModal} className={adminEditButtonClassname}>
            Modifier
          </button>
        ) : (
          ''
        )}
        {editable ? (
          <h5 className='font-bold text-xl bg-secondary-color text-white rounded-lg text-center'>
            Forfaits "tout compris" (Adhésion + licence + cours)
          </h5>
        ) : (
          <h4 className='font-bold text-xl bg-secondary-color text-white rounded-lg text-center'>
            Forfaits "tout compris" (Adhésion + licence + cours)
          </h4>
        )}

        <div className='py-4 md:flex  md:justify-between'>
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
          <div className='rounded-lg overflow-hidden border-2 border-secondary-color mt-2 w-fit m-auto md:m-0'>
            <table className='bg-whitetext-sm mobile:text-base'>
              <thead className='bg-secondary-color text-white'>
                <tr className='h-16'>
                  <th className='py-2 px-2 border-r border-white  text-left'>
                    Formules
                  </th>
                  <th className='py-2 px-2 border-r border-white  text-center'>
                    Baby
                  </th>
                  <th className='py-2 px-2 border-r border-white  text-center'>
                    - de 18ans
                  </th>
                  <th className='py-2 px-2 text-center'>+ de 18ans</th>
                </tr>
              </thead>
              <tbody>
                <tr className='h-16'>
                  <th className='py-2 px-2 border-r border-b border-secondary-color text-left'>
                    1h/semaine
                  </th>
                  <td className='py-2 px-4 border-r border-b border-secondary-color'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['oneHourWeekly']['baby']}
                    €
                  </td>
                  <td className='py-2 px-4 border-r border-b border-secondary-color'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['oneHourWeekly']['under18']}
                    €
                  </td>
                  <td className='py-2 px-4 border-b border-secondary-color'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['oneHourWeekly']['over18']}
                    €
                  </td>
                </tr>
                <tr className='h-16 text-left'>
                  <th className='py-2 px-2 border-r border-secondary-color '>
                    2h/semaine
                  </th>
                  <td className='py-2 px-4 bg-secondary-color border-r border-secondary-color'></td>
                  <td className='py-2 px-4 border-r border-secondary-color'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['twoHoursWeekly']['under18']}
                    €
                  </td>
                  <td className='py-2 px-4'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['twoHoursWeekly']['over18']}
                    €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Cartes */}
      <div className='py-4'>
        {editable ? (
          <h5 className='font-bold text-xl  bg-secondary-color text-white  rounded-lg text-center'>
            Cartes
          </h5>
        ) : (
          <h4 className='font-bold text-xl  bg-secondary-color text-white  rounded-lg text-center'>
            Cartes
          </h4>
        )}

        <div className='py-4 md:flex  md:justify-between'>
          <p className='italic py-4 font-sm'>
            Cotisation et licence obligatoire (non comprises)
          </p>
          <div className='rounded-lg overflow-hidden border-2 border-secondary-color w-fit m-auto md:m-0'>
            <table className='bg-white text-sm mobile:text-base'>
              <thead className='bg-secondary-color text-white'>
                <tr className='h-16  text-left'>
                  <th className='py-2 px-4 border-r border-white'>Cartes</th>
                  <th className='py-2 px-4'>Tarifs</th>
                </tr>
              </thead>
              <tbody>
                <tr className='h-16 text-left'>
                  <th
                    className='py-2 px-4 border-b-2 border-secondary-color'
                    colSpan='2'
                  >
                    Cours collectifs
                  </th>
                </tr>
                <tr className='h-16 text-left'>
                  <th className='py-2 px-4 border-r border-b border-secondary-color'>
                    5 heures
                  </th>
                  <td className='py-2 px-4  border-b border-secondary-color'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['cardGroupLessons'][
                        'fiveHours'
                      ]}
                    €
                  </td>
                </tr>
                <tr className='h-16 text-left'>
                  <th className='py-2 px-4 border-r border-secondary-color'>
                    10 heures
                  </th>
                  <td className='py-2 px-4'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['cardGroupLessons'][
                        'tenHours'
                      ]}
                    €
                  </td>
                </tr>
                <tr className='h-16 text-left'>
                  <th
                    className='py-2 px-4 border-t-2 border-b-2 border-secondary-color'
                    colSpan='2'
                  >
                    Cours particuliers
                  </th>
                </tr>
                <tr className='h-16 text-left'>
                  <th className='py-2 px-4 border-r border-b border-secondary-color'>
                    5 cours club
                  </th>
                  <td className='py-2 px-4  border-b border-secondary-color'>
                    {state.equestrianCenterPrices &&
                      state.equestrianCenterPrices['cardPrivatesLessons'][
                        'fiveClubLessons'
                      ]}
                    €
                  </td>
                </tr>
                <tr className='h-16'>
                  <th className='py-2 px-4 border-r border-secondary-color'>
                    5 cours propriétaire
                  </th>
                  <td className='py-2 px-4'>
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
          <h5 className='font-bold text-xl bg-secondary-color text-white  rounded-lg text-center'>
            Demi pension et tiers de pension
          </h5>
        ) : (
          <h4 className='font-bold text-xl bg-secondary-color text-white  rounded-lg text-center'>
            Demi pension et tiers de pension
          </h4>
        )}

        <div className='py-4 lg:flex lg:justify-between w-fit m-auto lg:m-0 lg:w-full'>
          <div>
            <p className='font-bold text-base'>
              (En fonction des chevaux disponibles)
            </p>
            <p className='italic py-4 text-base'>
              Cotisation et licence obligatoire (non comprises).
              <br />
              La monte libre exclus la pratique de l'obstacle.
            </p>
          </div>
          <div className='rounded-lg overflow-hidden border-2 border-secondary-color'>
            <table className='bg-white text-sm mobile:text-base'>
              <thead className='bg-secondary-color text-white'>
                <tr className='h-16 text-left'>
                  <th className='py-2 px-4 border-r border-white'>Formules</th>
                  <th className='py-2 px-4 border-r border-white'>
                    Descriptions
                  </th>
                  <th className='py-2 px-4'>Tarif mensuel</th>
                </tr>
              </thead>
              <tbody>
                <tr className='h-16 text-left'>
                  <th className='py-2 px-4 border-b border-r border-secondary-color'>
                    Tiers de pension
                  </th>
                  <td className='py-2 px-4 border-b border-r border-secondary-color'>
                    {state.pensionPrices &&
                      state.pensionPrices['thirdPartPension']['description']}
                  </td>
                  <td className='py-2 px-4 border-b border-secondary-color'>
                    {' '}
                    {state.pensionPrices &&
                      state.pensionPrices['thirdPartPension']['price']}
                    €
                  </td>
                </tr>
                <tr className='h-16 text-left'>
                  <th className='py-2 px-4 border-r border-secondary-color'>
                    Demi pension
                  </th>
                  <td className='py-2 px-4 border-r border-secondary-color'>
                    {state.pensionPrices &&
                      state.pensionPrices['halfPension']['description']}
                  </td>
                  <td className='py-2 px-4'>
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
      {isModalOpen ? (
        <Modal
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
