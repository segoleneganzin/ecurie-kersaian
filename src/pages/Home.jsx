import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const Home = () => {
  const navigate = useNavigate();
  const goTo = (page) => {
    navigate(page);
  };

  return (
    <div className='bg-principal-color h-dvh'>
      <header>
        <a href='/' aria-label="Aller à la page d'accueil">
          <h1 className='m-auto pt-16 w-fit'>
            <img src={logo} alt='Logo du site' />
          </h1>
        </a>
      </header>
      <main className='font-inconsolata'>
        <div className='flex flex-col gap-16 items-center justify-center mt-32 text-grey text-3xl lg:flex-row lg:gap-32'>
          <a
            className='transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer'
            onClick={() => goTo('/centre-equestre')}
          >
            <h2>Centre équestre</h2>
          </a>
          <a
            className='transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer'
            onClick={() => goTo('/pension')}
          >
            <h2>Pension</h2>
          </a>
          {/* <a
            className='flex transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer'
            onClick={() => goTo('/elevage-de-freol')}
          >
            <h2>Élevage de Fréol</h2>
          </a> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
