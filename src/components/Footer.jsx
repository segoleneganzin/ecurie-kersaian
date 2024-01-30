// import FFEChevalClub from '../assets/images/FFE-Logo-Cheval-Club-de-France.webp';
// import FFEPoneyClub from '../assets/images/FFE-Logo-Ecole-Française-dEquitation.webp';
import FFE from '../assets/images/FFE-Logo.jpg';
import languidic from '../assets/images/languidic.png';
const Footer = () => {
  return (
    <div className='bg-principal-color h-fit'>
      <div className='flex gap-6 py-6 justify-center'>
        <img src={FFE} alt='' className='w-16 h-auto' />
        <img src={languidic} alt='' className='w-24 h-auto' />
        {/* <img src={FFEChevalClub} alt='' className='w-10 h-10' />
        <img src={FFEPoneyClub} alt='' className='w-10 h-10' />
        <img src={languidic} alt='' className='w-10 h-10' /> */}
      </div>
      <p className='text-white italic text-center pb-4'>
        &copy; 2024 Réalisé par{' '}
        <a
          href='https://segoleneganzin.fr'
          rel='noreferrer'
          target='_blank'
          className='text-green-400'
        >
          Ségolène GANZIN
        </a>
      </p>
    </div>
  );
};

export default Footer;
