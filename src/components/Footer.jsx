import FFE from '../assets/images/FFE-Logo.webp';
import languidic from '../assets/images/languidic.webp';
const Footer = () => {
  return (
    <footer className='bg-principal-color h-fit'>
      <div className='flex gap-6 py-6 justify-center'>
        <img src={FFE} alt='' className='w-16 h-24' width={64} height={102} />
        <img
          src={languidic}
          alt=''
          className='w-24 h-24'
          width={96}
          height={102}
        />
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
    </footer>
  );
};

export default Footer;
