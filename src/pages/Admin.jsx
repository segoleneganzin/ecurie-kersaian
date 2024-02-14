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
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* ************************************************************** ADMINISTRATION ACCUEIL */}
        {choice === null && defaultDisplay}
        {/* ************************************************************** ADMINISTRATION CENTRE EQUESTRE */}
        {choice === 'equestrianCenter' && (
          /* ***************************************PLANNING */
          <div>
            <section className='pb-2 pt-16 lg:pb-4 sm:py-8' id='planning'>
              <h3 className={sectionTitleClassName + ' pl-2'}>Le planning</h3>
              <p className='italic pl-2 sm:pl-8 lg:pl-16 pt-0 pb-4'>
                Sélectionner la case du créneau souhaité et remplir le
                formulaire (attention le texte est blanc donc choisir une
                couleur de fond compatible) <br />
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
