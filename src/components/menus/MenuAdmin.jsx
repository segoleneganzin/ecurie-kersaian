import { useState } from 'react';
import Modal from '../Modal';

/**
 * Composant MenuAdmin pour afficher un lien qui ouvre une modal.
 *
 * @component
 * @returns {JSX.Element} - L'élément JSX du composant MenuAdmin.
 */
const MenuAdmin = () => {
  // État pour gérer l'ouverture/fermeture de la modal
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      {/* Lien pour ouvrir la modal */}
      <a
        onClick={() => {
          setModalOpen(true);
        }}
        className='cursor-pointer w-10 h-10 bg-secondary-color rounded-full flex justify-center items-center'
      >
        {/* Icône SVG */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
          className='w-6 h-6'
        >
          <path
            fill='#ffffff'
            d='M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z'
          />
        </svg>
      </a>

      {/* Affichage de la modal si isModalOpen est true */}
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          type={'updateLog'}
        />
      )}
    </div>
  );
};

export default MenuAdmin;
