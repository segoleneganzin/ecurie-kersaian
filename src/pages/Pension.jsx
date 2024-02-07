/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Installations from '../components/Installations';
import Contact from '../components/Contact';
import presentationImg from '../assets/images/pension.webp';
import ScrollUp from '../components/ScrollUp';
import PensionPrices from '../components/PensionPrices';
import {
  mainClassName,
  presentationButtonClassName,
  presentationButtonContainerClassName,
  presentationImgClassName,
  presentationParagraphClassName,
  presentationSectionClassName,
  sectionTitleClassName,
} from '../utils/GeneralClassNames';

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
      <main className={mainClassName}>
        {/* **************************************PRESENTATION */}
        <section className={presentationSectionClassName}>
          <img
            src={presentationImg}
            alt='Tête de cheval de face, derrière une barrière'
            className={presentationImgClassName}
            width={650}
            height={650}
          />
          <div>
            <p className={presentationParagraphClassName}>
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
            <div className={presentationButtonContainerClassName}>
              <a href='#contact' className={presentationButtonClassName}>
                Nous situer
              </a>
              <a href='#contact' className={presentationButtonClassName}>
                Nous contacter
              </a>
            </div>
          </div>
        </section>
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* **************************************FORMULES */}
        <section className='p-4 pt-16 lg:p-16 sm:p-8' id='formulas'>
          <h2 className={sectionTitleClassName}>Nos formules</h2>
          <p className='italic'>(Bientôt disponible)</p>
        </section>
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************TARIFS */}
        <PensionPrices />
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Pension;
