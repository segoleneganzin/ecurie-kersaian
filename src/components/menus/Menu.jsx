import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import ListItemsEquestrianCenter from './ListItemsEquestrianCenter';
import ListItemsPension from './ListItemsPension';

/**
 * Composant MenuPension pour afficher un menu de navigation réactif.
 *
 * @component
 * @returns {JSX.Element} - L'élément JSX du composant MenuPension.
 */
const Menu = ({ page }) => {
  // États pour gérer l'ouverture/fermeture du menu hamburger et la classe CSS du menu
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [menuClassName, setMenuClassName] = useState('hidden');
  const menu = useRef();

  /**
   * Fonction pour ouvrir/fermer le menu hamburger.
   */
  const toggleResponsiveMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  /**
   * Effet useEffect pour mettre à jour la classe CSS du menu en fonction de l'état du hamburger.
   */
  useEffect(() => {
    if (hamburgerOpen) {
      setMenuClassName(
        'absolute bg-principal-color lg:rounded-bl-3xl flex flex-col h-fit pb-12 lg:pl-12 right-0 top-200 z-97 w-full lg:w-auto'
      );
    } else {
      setMenuClassName('hidden');
    }
  }, [hamburgerOpen]);

  return (
    <div>
      {/* Icône du hamburger */}
      <div className='space-y-2 cursor-pointer' onClick={toggleResponsiveMenu}>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
      </div>
      {/* Menu de navigation */}
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
// Définition des types des propriétés du composant
Menu.propTypes = {
  page: PropTypes.string,
};

export default Menu;
