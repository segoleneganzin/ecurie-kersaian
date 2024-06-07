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
  const menu = useRef();

  const toggleResponsiveMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  /**
   * UseEffect to update the menu's CSS class according to the hamburger's state.
   */
  useEffect(() => {
    if (hamburgerOpen) {
      setMenuClassName(
        ' border-b-2 border-b-secondary-color absolute bg-white rounded-b-3xl flex flex-col h-fit pb-6 right-0 top-200 z-50 w-full md:pb-12 md:pl-12 md:border-0 md:rounded-b-0 md:w-auto md:bg-secondary-color md:top-48 md:rounded-l-3xl lg:top-64'
      );
    } else {
      setMenuClassName('hidden');
    }
  }, [hamburgerOpen]);

  return (
    <div>
      {/* hamburger icon */}
      <div className='space-y-2 cursor-pointer' onClick={toggleResponsiveMenu}>
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
    </div>
  );
};

Menu.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Menu;
