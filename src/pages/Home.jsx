import { Link } from 'react-router-dom/dist';
import logo from '../assets/logo2.png';

const Home = () => {
  return (
    <div className='h-dvh'>
      <header className='m-auto mt-24 w-fit lg:mt-48'>
        <img
          src={logo}
          alt="Logo de l'écurie Kersaïan"
          className='w-64 sm:w-auto'
        />
      </header>
      <main className='font-inconsolata'>
        <div className='flex flex-col gap-16 items-center justify-center mt-28 text-3xl lg:gap-28'>
          <Link
            className='hover:text-gray-500 hover:font-bold cursor-pointer pb-2 border-b-2 border-black hover:border-gray-500'
            to={'/centre-equestre'}
          >
            Centre équestre
          </Link>
          <Link
            className='hover:text-gray-500 hover:font-bold cursor-pointer pb-2 border-b-2 border-black hover:border-gray-500'
            to={'/pension'}
          >
            Pension
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
