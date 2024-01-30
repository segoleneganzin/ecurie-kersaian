/* eslint-disable react/no-unescaped-entities */
import Header from '../components/Header';
import Contact from '../components/Contact';
import presentationImg from '../assets/images/foal.jpeg';

const Breeding = () => {
  return (
    <div className='h-dvh'>
      <Header menu={'breeding'} />
      <main className='min-h-full text-principal-color'>
        {/* **************************************PRESENTATION */}
        <div className='p-2 pt-16 gap-6 flex justify-center flex-col sm:p-8 lg:p-16 xl:items-center xl:flex-row'>
          <img
            src={presentationImg}
            alt='Un poulain et sa mère en train de brouter'
            className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg md:h-650px md:max-w-650px md:min-w-650px'
          />
          <div>
            <p className='leading-10 text-center text-sm lg:text-xl xl:text-left'>
              Au cœur de la campagne, l'Élevage Équin Prestige se démarque en
              tant que spécialiste passionné dans l'élevage de chevaux de sport.{' '}
              <br />
              Chez nous, chaque naissance est une promesse d'excellence, et
              chaque poulain est destiné à briller sur les terrains de sport
              équestre.
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
        {/* **************************************ETALONS */}
        <div className='p-4 pt-16 lg:p-16 sm:p-8' id='stallions'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Nos étalons
          </h2>
        </div>
        {/* ***************************************POULINIERES */}
        <div className='p-4 pt-16 lg:p-16 sm:p-8' id='mares'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Nos poulinières
          </h2>
        </div>
        {/* ***************************************CHEVAUX A VENDRE */}
        <div className='p-4 pt-16 lg:p-16 sm:p-8' id='horse-for-sale'>
          <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
            Nos chevaux à vendre
          </h2>
          <ul className='leading-10 mt-4 space-y-5 text-principal-color text-sm lg:text-xl'>
            <li>Les shetlands</li>
            <li>Les poneys</li>
            <li>Les chevaux</li>
          </ul>
        </div>
        {/* ***************************************CONTACT */}
        <Contact />
      </main>
    </div>
  );
};

export default Breeding;
