import { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ScrollUp from '../components/ScrollUp';
import Contact from '../components/Contact';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import Installations from '../components/Installations';
import WeeklyPlanner from '../components/WeeklyPlanner';
import Cavalry from '../components/Cavalry';
import { mainClassName } from '../utils/GeneralClassNames';
import Presentation from '../components/Presentation';
import Activities from '../components/Activities';
import { handleScroll } from '../utils/functions';

const EquestrianCenter = () => {
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
      <Header menu={'equestrianCenter'} />
      <main className={mainClassName}>
        {/* **************************************PRESENTATION */}
        <Presentation />
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* **************************************ACTIVITIES */}
        <Activities />
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************CAVALERY */}
        <Cavalry />
        {/* ***************************************PRICES */}
        <EquestrianCenterPrices />
        {/* ***************************************PLANNING */}
        <WeeklyPlanner />
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default EquestrianCenter;
