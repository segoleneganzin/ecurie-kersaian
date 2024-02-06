import { Carousel } from '@material-tailwind/react';
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
  // Tableau d'objets représentant les images du carrousel
  const images = [
    { src: bachataHector, alt: 'Hector et Bachata' },
    { src: bachata, alt: 'Bachata' },
    { src: shetlands, alt: 'Les shetlands' },
    { src: shetland, alt: 'Un shetland' },
    { src: intrepide, alt: 'Intrépide' },
  ];

  return (
    <div className='max-w-500px m-auto'>
      <Carousel className='rounded-xl'>
        {images.map((image) => {
          return (
            <div key={image.alt}>
              <img
                src={image.src}
                alt={image.alt}
                className='h-auto w-full object-contain'
              />
              <p className='mt-2 text-center text-base'>{image.alt}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Cavalry;
