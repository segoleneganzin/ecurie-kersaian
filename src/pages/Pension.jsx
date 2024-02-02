/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Installations from '../components/Installations';
import Contact from '../components/Contact';
import presentationImg from '../assets/images/pension.webp';
import ScrollUp from '../components/ScrollUp';

const Pension = () => {
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
      <Header menu={'pension'} />
      <main className='min-h-full text-principal-color overflow-x-hidden font-inconsolata 2xl:max-w-screen-xl 2xl:m-auto'>
        {/* **************************************PRESENTATION */}
        <div className='p-2 pt-16 gap-6 flex justify-center flex-col sm:p-8 lg:p-16 xl:items-center xl:flex-row'>
          <img
            src={presentationImg}
            alt='Tête de cheval de face, derrière une barrière'
            className='h-300px m-auto max-w-300px min-w-300px object-cover rounded-full shadow-lg md:h-650px md:max-w-650px md:min-w-650px'
            width={650}
            height={650}
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
        {/* **************************************FORMULES */}
        <div className='p-4 pt-16 lg:p-16 sm:p-8' id='formulas'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Nos formules
          </h2>
          <p className='italic'>(Bientôt disponible)</p>
        </div>
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************TARIFS */}
        <div className='p-2 pt-16 lg:p-16 sm:p-8' id='prices'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Les tarifs
          </h2>
          <p className='italic'>(Bientôt disponible)</p>
        </div>
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Pension;
