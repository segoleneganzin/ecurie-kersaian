/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import presentationImg from '../assets/images/cc.jpg';
import lessonImg from '../assets/images/cours.jpg';
import walkImg from '../assets/images/balade.jpg';
import eventImg from '../assets/images/saian.jpg';
import ScrollUp from '../components/ScrollUp';
import Contact from '../components/Contact';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import Installations from '../components/Installations';
import WeeklyPlanner from '../components/WeeklyPlanner';
import Cavalry from '../components/Cavalry';

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
      <main className='min-h-full text-principal-color overflow-x-hidden font-inconsolata'>
        {/* **************************************PRESENTATION */}
        <div className='p-2 pt-16 gap-6 flex justify-center flex-col sm:p-8 lg:p-16 xl:items-center xl:flex-row'>
          <img
            src={presentationImg}
            alt="Cheval en train d'être brossé"
            className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg md:h-650px md:max-w-650px md:min-w-650px'
          />
          <div>
            <p className='leading-8 text-center xl:text-left text-base'>
              Située au cœur de la campagne de{' '}
              <span className='font-bold text-xl'>Languidic</span>,
              <br /> l'écurie Kersaian est{' '}
              <span className='font-bold text-xl'>
                dirigée par Alexia Lemoine
              </span>
              .
              <br />
              Depuis 2023, notre écurie est le point de rendez-vous idéal pour
              tous les passionnés de chevaux. <br />
              <br />À l'écurie Kersaian, on mise sur le{' '}
              <span className='font-bold text-xl'>respect des chevaux</span>, la
              <span className='font-bold text-xl'> sécurité des cavaliers</span>
              , et une vraie connexion avec nos copains à quatre pattes. <br />
              On adore la vie en plein air et{' '}
              <span className='font-bold text-xl'>
                nos chevaux vivent au pré
              </span>
              , loin du stress de la ville.
            </p>
            <div className='items-center mt-8 flex flex-col gap-5 md:flex-row md:justify-center xl:justify-start'>
              <a
                href='#contact'
                className='bg-secondary-color cursor-pointer p-6 rounded-lg shadow-lg text-white tracking-widest w-fit transform transition duration-400 hover:bg-principal-color'
              >
                Nous situer
              </a>
              <a
                href='#contact'
                className='bg-secondary-color cursor-pointer p-6 rounded-lg shadow-lg text-white tracking-widest w-fit transform transition duration-400 hover:bg-principal-color'
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* **************************************ACTIVITEES */}
        <div className='p-2 lg:p-16 pt-16 sm:p-8' id='activities'>
          <h2 className='text-principal-color font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Nos activités
          </h2>
          <ul className='leading-10 mt-4 space-y-5 text-base text-center lg:text-left lg:space-y-0 lg:flex lg:flex-col lg:gap-6 lg:items-start'>
            <li className='flex flex-col lg:flex-row lg:items-center lg:gap-12'>
              <img
                src={lessonImg}
                alt="cours d'équitation"
                className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg'
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
        </div>
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************CAVALERIE */}
        <div className='p-2 pt-16 lg:p-16 sm:p-8' id='cavalry'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Notre cavalerie
          </h2>
          {/* <ul className='leading-10 mt-4 space-y-5 text-principal-color text-base'>
            <li>Les shetlands</li>
            <li>Les poneys</li>
            <li>Les chevaux</li>
          </ul> */}
          <Cavalry />
        </div>
        {/* ***************************************PLANNING */}
        <div className='pb-2 pt-16 lg:pb-4 sm:py-8' id='planning'>
          {/* <div className='p-2 pt-16 lg:p-16 lg:pb-4 sm:p-8' id='planning'> */}
          <h2 className='text-principal-color font-bold pl-2 pb-10 sm:pl-8 lg:pl-16 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Le planning
          </h2>
          <WeeklyPlanner period={'school'} />
          <WeeklyPlanner period={'holiday'} />
        </div>
        {/* ***************************************TARIFS */}
        <EquestrianCenterPrices />
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default EquestrianCenter;
