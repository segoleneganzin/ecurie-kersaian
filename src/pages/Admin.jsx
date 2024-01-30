/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import Header from '../components/Header';
import WeeklyPlanner from '../components/WeeklyPlanner';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';

const Admin = () => {
  const [choice, setChoice] = useState(null);
  return (
    <div>
      <Header menu={'admin'} />
      <main className='min-h-full text-principal-color overflow-x-hidden'>
        <div className='bg-principal-color flex flex-col gap-16 items-center justify-center pb-16 text-grey text-3xl lg:flex-row lg:gap-32'>
          <a
            className='flex transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer'
            onClick={() => setChoice('equestrianCenter')}
          >
            <h2>Centre équestre</h2>
          </a>
          <a
            className='flex transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer'
            onClick={() => setChoice('pension')}
          >
            <h2>Pension</h2>
          </a>
        </div>
        {choice === 'equestrianCenter' ? (
          /* ***************************************PLANNING */
          <div>
            <div className='p-4 pt-16 lg:p-16 lg:pb-4 sm:p-8' id='planning'>
              <h3 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
                Le planning
              </h3>
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
    </div>
  );
};

export default Admin;
