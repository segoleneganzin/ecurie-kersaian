import PropTypes from 'prop-types';
import Menu from './Menu';
import MenuAdmin from '../components/admin/MenuAdmin';
import logo from '../assets/logo2.png';

const Header = ({ menu }) => {
  let headerMenu;
  let headerSubtitle;
  switch (menu) {
    case 'equestrianCenter':
      headerMenu = <Menu page='equestrianCenter' />;
      headerSubtitle = 'Centre équestre';
      break;
    case 'pension':
      headerMenu = <Menu page='pension' />;
      headerSubtitle = 'Pension';
      break;
    case 'admin':
      headerMenu = <MenuAdmin />;
      headerSubtitle = "Page d'administration";
      break;
    default:
      break;
  }
  return (
    <header className='flex flex-col gap-4 items-center justify-between p-6 lg:pt-12 md:flex-row lg:pr-12 font-inconsolata'>
      <div className='flex flex-col justify-center items-center pb-6 md:flex-row md:gap-12 md:pb-0'>
        <a
          href={menu === 'admin' ? '/admin' : '/'}
          aria-label="Aller à la page d'accueil"
          className='w-fit'
        >
          <img
            src={logo}
            alt='Logo du site'
            className='w-64 lg:ml-12 mb-2'
            width={256}
            height={188}
          />
        </a>
        <h1 className='text-xl tracking-widest lg:text-left lg:text-3xl w-fit font-bold'>
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
