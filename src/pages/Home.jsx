import { Link } from 'react-router-dom/dist';
import logo from '../assets/logo2.png';

const Home = () => {
  const linkClassNames =
    'hover:text-gray-500 hover:font-bold cursor-pointer pb-2 border-b-2 border-black hover:border-gray-500';
  return (
    <main className='font-inconsolata lg:mt-60'>
      <div className='flex flex-col gap-16 items-center justify-center mt-28 text-3xl lg:gap-28 lg:flex-row lg:justify-evenly lg:w-full'>
        <img
          src={logo}
          alt="Logo de l'écurie Kersaïan"
          className='w-64 sm:w-auto lg:order-2'
        />
        <Link
          className={linkClassNames + ` lg:order-3`}
          to={'/centre-equestre'}
        >
          Centre équestre
        </Link>
        <Link className={linkClassNames + ` lg:order-1`} to={'/pension'}>
          Pension
        </Link>
      </div>
    </main>
  );
};

export default Home;
