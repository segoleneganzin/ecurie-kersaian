import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import lessonImg from '../assets/images/cours.webp';
import walkImg from '../assets/images/balade.webp';
import eventImg from '../assets/images/saian.webp';
import ScrollUp from '../components/ScrollUp';
import Contact from '../components/Contact';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import Installations from '../components/Installations';
import WeeklyPlanner from '../components/WeeklyPlanner';
import Cavalry from '../components/Cavalry';
import {
  mainClassName,
  sectionTitleClassName,
} from '../utils/GeneralClassNames';
import Presentation from '../components/Presentation';

const EquestrianCenter = () => {
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
  return (
    <div className='h-dvh'>
      <Header menu={'equestrianCenter'} />
      <main className={mainClassName}>
        {/* **************************************PRESENTATION */}
        <Presentation />
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* **************************************ACTIVITIES */}
        <section className='p-2 lg:p-16 pt-16 sm:p-8' id='activities'>
          <h2 className={sectionTitleClassName}>Nos activités</h2>
          <ul className='leading-10 mt-4 space-y-5 text-base text-center lg:text-left lg:space-y-0 lg:flex lg:flex-col lg:gap-6 lg:items-start'>
            <li className='flex flex-col lg:flex-row lg:items-center lg:gap-12'>
              <img
                src={lessonImg}
                alt="cours d'équitation"
                className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg'
                width={300}
                height={300}
              />
              <span>
                Des{' '}
                <span className='color-secondary-color font-bold text-lg'>
                  cours
                </span>{' '}
                pour tout le monde à partir de 2 ans, encadrés par Alexia
              </span>
            </li>
            <li className='flex flex-col lg:flex-row lg:items-center lg:gap-12'>
              <img
                src={walkImg}
                alt='Shetlands dans la forêt'
                className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg'
                width={300}
                height={324}
              />
              <span>
                Des{' '}
                <span className='color-secondary-color font-bold text-lg'>
                  balades
                </span>{' '}
                au départ du club
              </span>
            </li>
            <li className='flex flex-col lg:flex-row lg:items-center lg:gap-12'>
              <img
                src={eventImg}
                alt='Cheval qui saute un obstacle'
                className='h-300px m-auto max-w-300px min-w-300px object-cover object-right-top rounded-full shadow-lg '
                width={300}
                height={300}
              />
              <span>
                Des événements, des sorties en{' '}
                <span className='color-secondary-color font-bold text-lg'>
                  compétitions
                </span>
                , des{' '}
                <span className='color-secondary-color font-bold text-lg'>
                  balades à la plage
                </span>{' '}
                et des{' '}
                <span className='color-secondary-color font-bold text-lg'>
                  stages
                </span>{' '}
                pendant les vacances
              </span>
            </li>
          </ul>
        </section>
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************CAVALERY */}
        <section className='p-2 pt-16 lg:p-16 sm:p-8' id='cavalry'>
          <h2 className={sectionTitleClassName}>Notre cavalerie</h2>
          <Cavalry />
        </section>

        {/* ***************************************PRICES */}
        <EquestrianCenterPrices />
        {/* ***************************************PLANNING */}
        <section className='pb-2 pt-8 lg:pb-4 sm:py-8' id='planning'>
          <h2 className={sectionTitleClassName + ' pl-2 sm:pl-6 lg:pl-16'}>
            Le planning
          </h2>
          <WeeklyPlanner period={'school'} />
          <WeeklyPlanner period={'holiday'} />
        </section>
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default EquestrianCenter;
