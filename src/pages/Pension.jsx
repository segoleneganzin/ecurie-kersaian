import { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Installations from '../components/Installations';
import Contact from '../components/Contact';
import ScrollUp from '../components/ScrollUp';
import PensionPrices from '../components/PensionPrices';
import {
  mainClassName,
  sectionTitleClassName,
} from '../utils/GeneralClassNames';
import Presentation from '../components/Presentation';

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
        <Presentation />
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* **************************************FORMULAS */}
        <section className='p-4 pt-16 lg:p-16 sm:p-8' id='formulas'>
          <h2 className={sectionTitleClassName}>Nos formules</h2>
          <p className='italic'>(Bientôt disponible)</p>
        </section>
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************PRICES */}
        <PensionPrices />
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Pension;
