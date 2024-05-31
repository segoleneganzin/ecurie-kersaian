import { useState, useEffect } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ScrollUp from '../components/ScrollUp';
import Contact from '../components/Contact';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import Installations from '../components/Installations';
import WeeklyPlanner from '../components/WeeklyPlanner';
import Cavalry from '../components/Cavalry';
import {
  mainClassName,
  sectionTitleClassName,
  sectionClassName,
} from '../utils/GeneralClassNames';
import Presentation from '../components/Presentation';
import Activities from '../components/Activities';
import { handleScroll } from '../utils/functions';

const EquestrianCenter = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    setShowScrollButton(handleScroll());
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
        <Activities />
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************CAVALERY */}
        <Cavalry />
        {/* ***************************************PRICES */}
        <EquestrianCenterPrices />
        {/* ***************************************PLANNING */}
        <section className={sectionClassName} id='planning'>
          <h2 className={sectionTitleClassName}>Notre planning</h2>
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
