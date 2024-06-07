import { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Installations from '../components/Installations';
import Contact from '../components/Contact';
import ScrollUp from '../components/ScrollUp';
import PensionPrices from '../components/PensionPrices';
import { mainClassName } from '../utils/GeneralClassNames';
import Presentation from '../components/Presentation';
import { handleScroll } from '../utils/functions';
import Section from '../layouts/Section';

const Pension = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScrollEvent = () => {
      setShowScrollButton(handleScroll());
    };
    // Attach the event listener
    window.addEventListener('scroll', handleScrollEvent);
    // Remove the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
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
        <Section editable={false} title={'Nos formules'} id={'formulas'}>
          <p className='italic'>(Bientôt disponible)</p>
        </Section>
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
