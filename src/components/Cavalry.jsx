import { useState, createRef } from 'react';
// carousel img
import bachataHector from '../assets/images/bachata-hector.webp';
import bachata from '../assets/images/bachata.webp';
import shetland from '../assets/images/shetland.webp';
import shetlands from '../assets/images/shetlands.webp';
import intrepide from '../assets/images/intrepide.webp';

/**
 * Composant Cavalry pour afficher un carrousel d'images avec navigation.
 *
 * @component
 * @returns {JSX.Element} - L'élément JSX du composant Cavalry.
 */
const Cavalry = () => {
  // États pour gérer l'image actuelle et les coordonnées tactiles
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Tableau d'objets représentant les images du carrousel
  const images = [
    { src: bachataHector, alt: 'Hector et Bachata' },
    { src: bachata, alt: 'Bachata' },
    { src: shetlands, alt: 'Les shetlands' },
    { src: shetland, alt: 'Un shetland' },
    { src: intrepide, alt: 'Intrépide' },
  ];

  // Références pour chaque image du carrousel
  const refs = images.map(() => createRef());

  /**
   * Fonction pour faire défiler le carrousel jusqu'à une image spécifique.
   *
   * @param {number} i - L'index de l'image à afficher.
   */
  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: 'smooth', // Animation de transition
      block: 'nearest', // Alignement vertical
      inline: 'start', // Alignement horizontal
    });
  };

  // Nombre total d'images dans le carrousel
  const totalImages = images.length;

  /**
   * Gestionnaire pour l'événement touchStart, enregistre la position X initiale.
   *
   * @param {object} e - L'événement tactile.
   */
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  /**
   * Gestionnaire pour l'événement touchMove, enregistre la position X actuelle.
   *
   * @param {object} e - L'événement tactile.
   */
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  /**
   * Gestionnaire pour l'événement touchEnd, détecte le glissement et passe à l'image précédente/suivante.
   *
   * @param {object} e - L'événement tactile.
   */
  const handleTouchEnd = (e) => {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        e.preventDefault(); // Empêche le comportement par défaut du glissement

        if (deltaX > 0) {
          // Glissé vers la gauche, passer à l'image précédente
          previousImage();
        } else {
          // Glissé vers la droite, passer à l'image suivante
          nextImage();
        }
      }

      // Réinitialiser les coordonnées tactiles
      setTouchStartX(null);
      setTouchEndX(null);
    }
  };

  /**
   * Fonction pour passer à l'image suivante dans le carrousel.
   */
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  /**
   * Fonction pour passer à l'image précédente dans le carrousel.
   */
  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  /**
   * Fonction pour créer un contrôle de glissement (bouton gauche/droite).
   *
   * @param {boolean} isLeft - Indique s'il s'agit du bouton gauche.
   * @returns {JSX.Element} - L'élément JSX du contrôle de glissement.
   */
  const sliderControl = (isLeft) => (
    <button
      type='button'
      onClick={isLeft ? previousImage : nextImage}
      className='text-principal-color text-xl z-10 lg:mx-6 h-10 w-10 rounded-full opacity-75 flex items-center justify-center'
    >
      <span role='img' aria-label={`Flèche ${isLeft ? 'gauche' : 'droite'}`}>
        {isLeft ? '◀' : '▶'}
      </span>
    </button>
  );

  // Rendu du composant Cavalry
  return (
    <div
      className='flex justify-center max-w-full m-auto items-center lg:w-2/3'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='flex flex-row items-center'>
        {sliderControl(true)}
        <div className='inline-flex overflow-x-hidden snap-mandatory snap-x'>
          {/* Affichage de chaque image du carrousel */}
          {images.map((img, i) => (
            <figure
              className='w-full flex-shrink-0'
              key={img.src}
              ref={refs[i]}
            >
              <img
                src={img.src}
                className='w-full object-contain sm:max-h-500px'
                alt={img.alt}
                width={710}
                height={500}
              />
              <figcaption className='text-lg text-center'>{img.alt}</figcaption>
            </figure>
          ))}
        </div>
        {sliderControl()}
      </div>
    </div>
  );
};

export default Cavalry;
