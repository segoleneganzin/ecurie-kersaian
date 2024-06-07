import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import ListItemsEquestrianCenter from '../components/menus/ListItemsEquestrianCenter';
import ListItemsPension from '../components/menus/ListItemsPension';

/**
 * React component to display a responsive navigation menu.
 *
 * @component
 * @returns {JSX.Element}
 */
const Menu = ({ page }) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [menuClassName, setMenuClassName] = useState('hidden');
  const menuClassNamesBasics =
    'shadow-xl border-b-secondary-color absolute bg-white rounded-b-3xl flex flex-col h-fit pb-6 right-0 top-[420px] z-10 w-full md:z-50 md:pb-12 md:pl-12 md:shadow-none md:rounded-b-0 md:w-auto md:bg-secondary-color md:top-48 md:rounded-l-3xl lg:top-64';
  const menu = useRef();

  const toggleResponsiveMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  /**
   * UseEffect to update the menu's CSS class according to the hamburger's state.
   */
  useEffect(() => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    if (hamburgerOpen) {
      if (isMobile) {
        setMenuClassName(menuClassNamesBasics + ' animate-openMenuMobile');
      } else {
        setMenuClassName(menuClassNamesBasics + ' animate-openMenu');
      }
    } else if (!hamburgerOpen && menuClassName !== 'hidden') {
      if (isMobile) {
        setMenuClassName(menuClassNamesBasics + ' animate-closeMenuMobile');
      } else {
        setMenuClassName(menuClassNamesBasics + ' animate-closeMenu');
      }
      setTimeout(() => setMenuClassName('hidden'), 1000);
    }
  }, [hamburgerOpen, menuClassName]);

  return (
    <>
      {/* hamburger icon */}
      <div
        className='bg-white space-y-2 cursor-pointer z-50 w-full flex flex-col items-center pb-4 md:pb-0 md:w-fit'
        onClick={toggleResponsiveMenu}
      >
        <div className='rounded w-14 h-1 bg-black'></div>
        <div className='rounded w-14 h-1 bg-black'></div>
        <div className='rounded w-14 h-1 bg-black'></div>
      </div>
      {/* Navigation menu */}
      <nav ref={menu} className={menuClassName}>
        {page === 'equestrianCenter' && (
          <ListItemsEquestrianCenter
            toggleResponsiveMenu={toggleResponsiveMenu}
          />
        )}
        {page === 'pension' && (
          <ListItemsPension toggleResponsiveMenu={toggleResponsiveMenu} />
        )}
      </nav>
    </>
  );
};

Menu.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Menu;
