import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.webp';

const Home = () => {
  const navigate = useNavigate();
  const goTo = (page) => {
    navigate(page);
  };

  return (
    <div className='bg-principal-color h-dvh'>
      <header>
        <h1 className='m-auto pt-16 w-fit'>
          <img src={logo} alt='Logo du site' className='w-64 sm:w-auto' />
        </h1>
      </header>
      <main className='font-inconsolata'>
        <div className='flex flex-col gap-16 items-center justify-center mt-32 text-grey text-3xl lg:flex-row lg:gap-32'>
          <a
            className='transform transition duration-500 hover:bg-secondary-color hover:text-white cursor-pointer origin-bottom rounded-full bg-principal-color button-neumorphism-shadow p-8'
            onClick={() => goTo('/centre-equestre')}
          >
            <h2>Centre équestre</h2>
          </a>
          <a
            className='transform transition duration-500 hover:bg-secondary-color hover:text-white cursor-pointer origin-bottom rounded-full bg-principal-color button-neumorphism-shadow p-8'
            onClick={() => goTo('/pension')}
          >
            <h2>Pension</h2>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
