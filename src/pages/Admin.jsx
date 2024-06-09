import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import SignInModule from '../components/admin/authentication/SignInModule';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
// import WeeklyPlanner from '../components/WeeklyPlanner';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import ScrollUp from '../components/ScrollUp';
import PensionPrices from '../components/PensionPrices';
import { handleScroll } from '../utils/functions';
import HomeAdmin from '../components/admin/HomeAdmin';
import ChoicePageAdmin from '../components/admin/ChoicePageAdmin';
import SiteLink from '../components/SiteLink';
import Section from '../layouts/Section';
import Planner from '../components/Planner';

const Admin = () => {
  const { currentUser } = useContext(UserContext);
  const [choice, setChoice] = useState(null);
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

  return currentUser ? (
    <div className='font-inconsolata min-h-screen'>
      <Header menu={'admin'} />
      <main className='min-h-dvh text-principal-color overflow-x-hidden font-inconsolata 2xl:max-w-screen-xl 2xl:m-auto'>
        <ChoicePageAdmin setChoice={setChoice} />
        <SiteLink />
        {/* **************************************SCROLL UP */}
        {showScrollButton && <ScrollUp />}
        {/* ************************************************************** ADMINISTRATION HOME */}
        {choice === null && <HomeAdmin />}
        {/* ************************************************************** ADMINISTRATION EQUESTRIAN CENTER */}
        {choice === 'equestrianCenter' && (
          /* ***************************************PLANNING */
          <>
            <Planner editable />
            {/* <WeeklyPlanner editable /> */}
            {/* ***************************************PRICES */}
            <EquestrianCenterPrices editable />
          </>
        )}
        {/* ************************************************************** ADMINISTRATION PENSION */}
        {choice === 'pension' && (
          <div>
            {/* **************************************FORMULAS */}
            <Section editable title={'Nos formules'} id={'formulas'}>
              <p className='italic'>(Bientôt disponible)</p>
            </Section>
            {/* ***************************************PRICES */}
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
