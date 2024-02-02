import { useState, useRef, useEffect } from 'react';

/**
 * Composant MenuPension pour afficher un menu de navigation réactif.
 *
 * @component
 * @returns {JSX.Element} - L'élément JSX du composant MenuPension.
 */
const MenuPension = () => {
  // États pour gérer l'ouverture/fermeture du menu hamburger et la classe CSS du menu
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [menuClassName, setMenuClassName] = useState('hidden');
  const menu = useRef();

  /**
   * Fonction pour ouvrir/fermer le menu hamburger.
   */
  const openResponsiveMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  /**
   * Effet useEffect pour mettre à jour la classe CSS du menu en fonction de l'état du hamburger.
   */
  useEffect(() => {
    if (hamburgerOpen) {
      setMenuClassName(
        'absolute bg-principal-color rounded-bl-3xl flex flex-col h-fit pb-12 pl-12 right-0 top-200 z-97'
      );
    } else {
      setMenuClassName('hidden');
    }
  }, [hamburgerOpen]);

  return (
    <div>
      {/* Icône du hamburger */}
      <div className='space-y-2 cursor-pointer' onClick={openResponsiveMenu}>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
      </div>

      {/* Menu de navigation */}
      <nav ref={menu} className={menuClassName}>
        <ul
          className='mr-14 mt-16 space-y-10 text-right text-white text-xl'
          role='menu'
        >
          <li
            role='menuitem'
            className='w-fit transform transition duration-500 hover:scale-125 origin-bottom lg:origin-bottom-right'
          >
            <a href='#formulas' rel='ugc' onClick={openResponsiveMenu}>
              Formules
            </a>
          </li>
          <li
            role='menuitem'
            className='w-fit transform transition duration-500 hover:scale-125 origin-bottom lg:origin-bottom-right'
          >
            <a href='#installations' rel='ugc' onClick={openResponsiveMenu}>
              Installations
            </a>
          </li>
          <li
            role='menuitem'
            className='w-fit transform transition duration-500 hover:scale-125 origin-bottom lg:origin-bottom-right'
          >
            <a href='#prices' rel='ugc' onClick={openResponsiveMenu}>
              Tarifs
            </a>
          </li>
          <li
            role='menuitem'
            className='w-fit transform transition duration-500 hover:scale-125 origin-bottom lg:origin-bottom-right'
          >
            <a href='#contact' rel='ugc' onClick={openResponsiveMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuPension;
