import { useState, useRef, useEffect } from 'react';
const MenuPension = () => {
  // return (
  //   <nav className='menu'>
  //     <ul>
  //       <li>
  //         <a href='#activities'>Formules</a>
  //       </li>
  //       <li>
  //         <a href='#installations'>Installations</a>
  //       </li>
  //       <li>
  //         <a href='#prices'>Tarifs</a>
  //       </li>
  //       <li>
  //         <a href='#contact'>Contact</a>
  //       </li>
  //     </ul>
  //   </nav>
  // );
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
            <a href='#formulas' rel='ugc'>
              Formules
            </a>
          </li>
          <li className='menu__item' role='menuitem'>
            <a href='#installations' rel='ugc'>
              Installations
            </a>
          </li>
          <li className='menu__item' role='menuitem'>
            <a href='#prices' rel='ugc' className='color-white'>
              Tarifs
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

export default MenuPension;
