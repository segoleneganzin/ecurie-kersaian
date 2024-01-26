import PropTypes from 'prop-types';
import MenuEquestrianCenter from './MenuEquestrianCenter';
import MenuPension from './MenuPension';
import MenuBreeding from './MenuBreeding';
import logo from '../assets/images/logo.jpg';

const Header = ({ menu }) => {
  let headerMenu;
  let headerSubtitle;
  switch (menu) {
    case 'equestrianCenter':
      headerMenu = <MenuEquestrianCenter />;
      headerSubtitle = 'Centre équestre';
      break;
    case 'pension':
      headerMenu = <MenuPension />;
      headerSubtitle = 'Pension';
      break;
    case 'breeding':
      headerMenu = <MenuBreeding />;
      headerSubtitle = 'Élevage de Fréol';
      break;
    default:
      break;
  }
  return (
    <header className='bg-principal-color flex flex-col gap-4 items-center justify-between pb-12 lg:pt-12 shadow-lg lg:flex-row lg:pr-12'>
      <div className='flex flex-col justify-center pb-6 lg:flex-row lg:items-center lg:gap-20 lg:pb-0'>
        <a href='/' aria-label="Aller à la page d'accueil">
          <img src={logo} alt='Logo du site' className='w-72' />
        </a>
        <h1 className='text-xl text-center text-white tracking-widest lg-text-left lg:text-3xl'>
          {headerSubtitle}
        </h1>
      </div>
      {headerMenu}
    </header>
  );
};

Header.propTypes = {
  menu: PropTypes.string.isRequired,
};

export default Header;
