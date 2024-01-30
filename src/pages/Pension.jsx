/* eslint-disable react/no-unescaped-entities */
import Header from '../components/Header';
import Installations from '../components/Installations';
import Contact from '../components/Contact';
import presentationImg from '../assets/images/pension-presentation.jpg';

const Pension = () => {
  return (
    <div className='h-dvh'>
      <Header menu={'pension'} />
      <main className='min-h-full text-principal-color'>
        {/* **************************************PRESENTATION */}
        <div className='p-2 pt-16 gap-6 flex justify-center flex-col sm:p-8 lg:p-16 xl:items-center xl:flex-row'>
          <img
            src={presentationImg}
            alt='Tête de cheval de face, derrière une barrière'
            className='h-300px m-auto max-w-300px min-w-300px object-cover rounded-full shadow-lg md:h-650px md:max-w-650px md:min-w-650px'
          />
          <div>
            <p className='leading-10 text-center text-base lg:text-xl xl:text-left'>
              Située au cœur de la campagne de{' '}
              <span className='font-bold text-xl lg:text-3xl'>Languidic</span>,
              <br /> l'écurie Kersaian est{' '}
              <span className='font-bold text-xl lg:text-3xl'>
                dirigée par Alexia Lemoine
              </span>
              .
              <br />
              Depuis 2023, notre écurie est le point de rendez-vous idéal pour
              tous les passionnés de chevaux. <br />
              <br />À l'écurie Kersaian, on mise sur le{' '}
              <span className='font-bold text-xl lg:text-3xl'>
                respect des chevaux
              </span>
              , la
              <span className='font-bold text-xl lg:text-3xl'>
                {' '}
                sécurité des cavaliers
              </span>
              , et une vraie connexion avec nos copains à quatre pattes. <br />
              On adore la vie en plein air et{' '}
              <span className='font-bold text-xl lg:text-3xl'>
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
        {/* **************************************FORMULES */}
        <div className='p-4 pt-16 lg:p-16 sm:p-8' id='formulas'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Nos formules
          </h2>
        </div>
        {/* ***************************************INSTALLATIONS */}
        <Installations />
        {/* ***************************************TARIFS */}
        <div className='p-2 pt-16 lg:p-16 sm:p-8' id='prices'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Les tarifs
          </h2>
        </div>
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
    </div>
  );
};

export default Pension;
