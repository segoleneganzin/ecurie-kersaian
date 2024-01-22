/* eslint-disable react/no-unescaped-entities */
import Header from '../components/Header';
import Footer from '../components/Footer';
import presentationImg from '../assets/images/presentation.avif';
import Contact from '../components/Contact';
import EquestrianCenterPrices from '../components/EquestrianCenterPrices';
import Installations from '../components/Installations';
import Planning from '../components/Planning';

const EquestrianCenter = () => {
  return (
    <div className='h-dvh'>
      <Header menu={'equestrianCenter'} />
      <main className='min-h-full text-principal-color overflow-x-hidden'>
        {/* **************************************PRESENTATION */}
        <div className='p-2 pt-16 gap-6 flex justify-center flex-col sm:p-8 lg:p-16 xl:items-center xl:flex-row'>
          <img
            src={presentationImg}
            alt="Cheval en train d'être brossé"
            className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg md:h-650px md:max-w-650px md:min-w-650px'
          />
          <div>
            <p className='leading-10 text-center lg:text-xl xl:text-left'>
              Située au cœur de la campagne de{' '}
              <span className='font-bold text-2xl lg:text-3xl'>Languidic</span>,
              <br /> l'écurie Kersaian est{' '}
              <span className='font-bold text-2xl lg:text-3xl'>
                dirigée par Alexia Lemoine
              </span>
              .
              <br />
              Depuis 2023, notre écurie est le point de rendez-vous idéal pour
              tous les passionnés de chevaux. <br />
              <br />À l'écurie Kersaian, on mise sur le{' '}
              <span className='font-bold text-2xl lg:text-3xl'>
                respect des chevaux
              </span>
              , la
              <span className='font-bold text-2xl lg:text-3xl'>
                {' '}
                sécurité des cavaliers
              </span>
              , et une vraie connexion avec nos copains à quatre pattes. <br />
              On adore la vie en plein air et{' '}
              <span className='font-bold text-2xl lg:text-3xl'>
                nos chevaux vivent au pré
              </span>
              , loin du stress de la ville.
            </p>
            <div className='items-center mt-8 flex flex-col gap-5 md:flex-row md:justify-center xl:justify-start'>
              <a
                href='#contact'
                className='bg-secondary-color cursor-pointer p-6 rounded-lg shadow-lg text-white tracking-widest w-fit'
              >
                Nous situer
              </a>
              <a
                href='#contact'
                className='bg-secondary-color cursor-pointer p-6 rounded-lg shadow-lg text-white tracking-widest w-fit'
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
        {/* **************************************ACTIVITIES */}
        <div className='p-4 pt-16 lg:p-16 sm:p-8' id='activities'>
          <h2 className='font-bold pb-10 text-5xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Nos activités
          </h2>
          <ul className='leading-10 mt-4 space-y-5 text-principal-color lg:text-xl'>
            <li>
              - Des cours pour tout le monde à partir de 2 ans, encadrées par
              une monitrice super sympa.
            </li>
            <li>
              - Des balades à cheval dans la campagne de Languidic, avec une
              vraie dose de nature.
            </li>
            <li>
              - Des événements, des sorties en compétitions, des balades à la
              plage et des stages pendant les vacances
            </li>
          </ul>
        </div>
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************CAVALRY */}
        <div className='p-4 pt-16 lg:p-16 sm:p-8' id='cavalry'>
          <h2 className='font-bold pb-10 text-5xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Notre cavalerie
          </h2>
          <ul className='leading-10 mt-4 space-y-5 text-principal-color  lg:text-xl'>
            <li>Les shetlands</li>
            <li>Les poneys</li>
            <li>Les chevaux</li>
          </ul>
        </div>
        {/* ***************************************PLANNING */}
        <Planning />
        {/* ***************************************PRICES */}
        <EquestrianCenterPrices />
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default EquestrianCenter;
