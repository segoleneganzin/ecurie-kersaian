import { useState, useRef, useEffect } from 'react';

const MenuEquestrianCenter = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [menuClassName, setMenuClassName] = useState('hidden');
  const menu = useRef();
  const openResponsiveMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  useEffect(() => {
    if (hamburgerOpen) {
      setMenuClassName(
        'absolute bg-principal-color flex flex-col items-center h-fit pb-12 right-0 text-center top-200 w-full z-97 lg:pl-12 lg:rounded-bl-3xl lg:w-fit'
      );
    } else {
      setMenuClassName('hidden');
    }
  }, [hamburgerOpen]);
  return (
    <div>
      <div className='space-y-2 cursor-pointer' onClick={openResponsiveMenu}>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
      </div>
      <nav ref={menu} className={menuClassName}>
        <ul
          className='mt-16 space-y-10 text-center text-white text-xl lg:mr-14 lg:text-right'
          role='menu'
        >
          <li role='menuitem'>
            <a href='#activities' rel='ugc' onClick={openResponsiveMenu}>
              Activités
            </a>
          </li>
          <li role='menuitem'>
            <a href='#installations' rel='ugc' onClick={openResponsiveMenu}>
              Installations
            </a>
          </li>
          {/* <li className='w-fit' role='menuitem'>
            <a href='#cavalry' rel='ugc' onClick={openResponsiveMenu}>
              Cavalerie
            </a>
          </li> */}
          <li role='menuitem'>
            <a href='#planning' rel='ugc' onClick={openResponsiveMenu}>
              Planning
            </a>
          </li>
          <li role='menuitem'>
            <a href='#prices' rel='ugc' onClick={openResponsiveMenu}>
              Tarifs
            </a>
          </li>
          <li role='menuitem'>
            <a href='#contact' rel='ugc' onClick={openResponsiveMenu}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuEquestrianCenter;
