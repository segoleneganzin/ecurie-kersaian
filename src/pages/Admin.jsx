/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import SignInModule from '../components/SignInModule';
import Header from '../components/Header';
import WeeklyPlanner from '../components/WeeklyPlanner';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import ScrollUp from '../components/ScrollUp';
import Footer from '../components/Footer';
import PensionPrices from '../components/PensionPrices';
import { sectionTitleClassName } from '../utils/GeneralClassNames';
import { SITE_URL } from '../utils/Constants';

const Admin = () => {
  const { currentUser } = useContext(UserContext);
  const [choice, setChoice] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    // Adjust this value based on the scroll position where you want the button to appear
    const showScrollButtonThreshold = 500;
    setShowScrollButton(scrollPosition > showScrollButtonThreshold);
  };
  useEffect(() => {
    handleScroll();
    // Attach the event listener
    window.addEventListener('scroll', handleScroll);
  }, [showScrollButton]);

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
  return currentUser ? (
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
        <a
          href={SITE_URL}
          target='_blank'
          rel='noreferrer'
          className='flex gap-2 items-center mt-6 w-fit m-auto'
        >
          Voir le site
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className='w-4 h-4'
          >
            <path
              fill='#353130'
              d='M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z'
            />
          </svg>
        </a>
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* ************************************************************** ADMINISTRATION ACCUEIL */}
        {choice === null && defaultDisplay}
        {/* ************************************************************** ADMINISTRATION CENTRE EQUESTRE */}
        {choice === 'equestrianCenter' && (
          /* ***************************************PLANNING */
          <div>
            <section className='pb-2 pt-16 lg:pb-4 sm:py-8' id='planning'>
              <h3 className={sectionTitleClassName + ' pl-2 sm:pl-8 lg:pl-16'}>
                Le planning
              </h3>
              <p className='italic pl-2 sm:pl-8 lg:pl-16 pt-0 pb-4'>
                Sélectionner la case du créneau souhaité et remplir le
                formulaire (attention le texte est noir donc choisir une couleur
                de fond compatible) <br />
                Le créneau apparaîtra sur la page publique (penser à fermer la
                page du centre équestre et à la réouvrir)
                <br />
                Il est également possible de modifier la date des vacances
                scolaires.
              </p>
              <WeeklyPlanner editable period={'school'} />
              <WeeklyPlanner editable period={'holiday'} />
            </section>
            {/* ***************************************TARIFS */}
            <EquestrianCenterPrices editable />
          </div>
        )}
        {/* ************************************************************** ADMINISTRATION PENSION */}
        {choice === 'pension' && (
          <div>
            {/* **************************************FORMULES */}
            <section className='p-4 pt-16 lg:p-16 sm:p-8' id='formulas'>
              <h3 className={sectionTitleClassName}>Nos formules</h3>
              <p className='italic'>(Bientôt disponible)</p>
            </section>
            {/* ***************************************TARIFS */}
            <PensionPrices editable />
          </div>
        )}
      </main>
      <Footer />
    </div>
  ) : (
    <div>
      <SignInModule />
    </div>
  );
};

export default Admin;
