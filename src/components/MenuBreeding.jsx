import { useState, useRef, useEffect } from 'react';
const MenuBreeding = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [menuClassName, setMenuClassName] = useState('hidden');
  const menu = useRef();
  const openResponsiveMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
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
      <div className='space-y-2 cursor-pointer' onClick={openResponsiveMenu}>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
        <div className='w-14 h-2 bg-secondary-color'></div>
      </div>
      <nav ref={menu} className={menuClassName}>
        <ul
          className='mr-14 mt-16 space-y-10 text-right text-white text-xl'
          role='menu'
        >
          <li className='menu__item' role='menuitem'>
            <a href='#stallions' rel='ugc'>
              Étalons
            </a>
          </li>
          <li className='menu__item' role='menuitem'>
            <a href='#mares' rel='ugc'>
              Poulinières
            </a>
          </li>
          <li className='menu__item' role='menuitem'>
            <a href='#horse-for-sale' rel='ugc'>
              Chevaux à vendre
            </a>
          </li>
          <li className='menu__item' role='menuitem'>
            <a href='#contact' rel='ugc' className='color-white'>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuBreeding;
