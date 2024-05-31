import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import SignInModule from '../components/admin/authentication/SignInModule';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import WeeklyPlanner from '../components/WeeklyPlanner';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import ScrollUp from '../components/ScrollUp';
import PensionPrices from '../components/PensionPrices';
import { sectionTitleClassName } from '../utils/GeneralClassNames';
import { handleScroll } from '../utils/functions';
import HomeAdmin from '../components/admin/HomeAdmin';
import ChoicePageAdmin from '../components/admin/ChoicePageAdmin';
import SiteLink from '../components/SiteLink';

const Admin = () => {
  const { currentUser } = useContext(UserContext);
  const [choice, setChoice] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    setShowScrollButton(handleScroll());
    // Attach the event listener
    window.addEventListener('scroll', handleScroll);
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
          <div>
            <section className='pb-2 pt-16 lg:pb-4 sm:py-8' id='planning'>
              <h3 className={sectionTitleClassName + ' pl-2 sm:pl-8 lg:pl-16'}>
                Le planning
              </h3>
              <p className='italic pl-2 sm:pl-8 lg:pl-16 pt-0 pb-4'>
                Sélectionner la case du créneau souhaité et remplir le
                formulaire (attention le texte est noir donc choisir une couleur
                de fond compatible) <br />
                Le créneau apparaîtra sur la page publique (penser à fermer la
                page du centre équestre et à la réouvrir)
                <br />
                Il est également possible de modifier la date des vacances
                scolaires.
              </p>
              <WeeklyPlanner editable period={'holiday'} />
            </section>
            {/* ***************************************PRICES */}
            <EquestrianCenterPrices editable />
          </div>
        )}
        {/* ************************************************************** ADMINISTRATION PENSION */}
        {choice === 'pension' && (
          <div>
            {/* **************************************FORMULAS */}
            <section className='p-4 pt-16 lg:p-16 sm:p-8' id='formulas'>
              <h3 className={sectionTitleClassName}>Nos formules</h3>
              <p className='italic'>(Bientôt disponible)</p>
            </section>
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
