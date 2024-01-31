/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Header from '../components/Header';
import WeeklyPlanner from '../components/WeeklyPlanner';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import Footer from '../components/Footer';

const Admin = () => {
  const [choice, setChoice] = useState(null);
  const defaultDisplay = (
    <div className='flex flex-col items-center gap-8 mt-10 px-6 text-center'>
      <p className='text-lg border-b-2 border-principal-color pb-8'>
        Cette page permet de mettre à jour les données visibles par les
        visiteurs{' '}
      </p>
      <p>Il est possible de modifier : </p>
      <ul className='pt-4 leading-8 text-left space-y-4'>
        <li>
          Les <span className='font-bold text-green-800'>tarifs</span> des pages
          'centre équestre' et 'pension'
        </li>
        <li>
          Les <span className='font-bold text-green-800'>plannings</span> de la
          page 'centre équestre'
        </li>
      </ul>
    </div>
  );
  return (
    <div className='font-inconsolata min-h-screen'>
      <Header menu={'admin'} />
      <main className='min-h-dvh text-principal-color overflow-x-hidden font-inconsolata 2xl:max-w-screen-xl 2xl:m-auto'>
        <div className='bg-principal-color flex flex-col gap-16 items-center justify-center pb-16 text-gray-400 text-xl lg:flex-row lg:gap-32 2xl:rounded-b-xl'>
          <a
            className='flex transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer origin-bottom'
            onClick={() => setChoice('equestrianCenter')}
          >
            <h2>Centre équestre</h2>
          </a>
          <a
            className='flex transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer origin-bottom'
            onClick={() => setChoice('pension')}
          >
            <h2>Pension</h2>
          </a>
        </div>
        {choice === null && defaultDisplay}
        {choice === 'equestrianCenter' ? (
          /* ***************************************PLANNING */
          <div>
            <div className='pb-2 pt-16 lg:pb-4 sm:py-8' id='planning'>
              <h3 className='font-bold pl-2 pb-10 sm:pl-8 lg:pl-16 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
                Le planning
              </h3>
              <p className='italic pl-2 sm:pl-8 lg:pl-16 pt-0 pb-4'>
                Sélectionner la case du créneau souhaité et remplir le
                formulaire (attention le texte est blanc donc choisir une
                couleur de fond compatible) <br />
                Le créneau apparaîtra sur la page publique (penser à recharger
                la page)
                <br />
                Il est également possible de modifier la date des vacances
                scolaires.
              </p>
              <WeeklyPlanner editable period={'school'} />
              <WeeklyPlanner editable period={'holiday'} />
            </div>
            {/* ***************************************TARIFS */}
            <EquestrianCenterPrices editable />
          </div>
        ) : (
          ''
        )}
        {choice === 'pension' ? (
          <div>
            {/* **************************************FORMULES */}
            <div className='p-4 pt-16 lg:p-16 sm:p-8' id='formulas'>
              <h3 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
                Nos formules
              </h3>
            </div>
            {/* ***************************************TARIFS */}
            <div className='p-2 pt-16 lg:p-16 sm:p-8' id='prices'>
              <h3 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
                Les tarifs
              </h3>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
