import { useState, createRef } from 'react';
// carousel img
import bachataHector from '../assets/images/bachata-hector.webp';
import bachata from '../assets/images/bachata.webp';
import shetland from '../assets/images/shetland.webp';
import shetlands from '../assets/images/shetlands.webp';
import intrepide from '../assets/images/intrepide.webp';

const Cavalry = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const images = [
    { src: bachataHector, alt: 'Hector et Bachata' },
    { src: bachata, alt: 'Bachata' },
    { src: intrepide, alt: 'Intrépide' },
    { src: shetlands, alt: 'Jazzy, Crunch et Deborah' },
    { src: shetland, alt: 'Crunch' },
  ];
  const refs = images.map(() => createRef());

  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: 'smooth',
      //      Defines vertical alignment.
      block: 'nearest',
      //      Defines horizontal alignment.
      inline: 'start',
    });
  };

  const totalImages = images.length;

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      // manage conflicts with arrows
      if (Math.abs(deltaX) > 50) {
        e.preventDefault(); // Prevent default behavior on swipe

        if (deltaX > 0) {
          // Swiped left, move to the previous image
          previousImage();
        } else {
          // Swiped right, move to the next image
          nextImage();
        }
      }

      // Reset touch coordinates
      setTouchStartX(null);
      setTouchEndX(null);
    }
  };

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const sliderControl = (isLeft) => (
    <button
      type='button'
      onClick={isLeft ? previousImage : nextImage}
      className={
        isLeft
          ? 'left-0 text-principal-color text-xl relative '
          : 'right-0' +
            ' text-principal-color text-xl z-10   rounded-full flex items-center justify-center relative'
      }
    >
      <span role='img' aria-label={`Flèche ${isLeft ? 'gauche' : 'droite'}`}>
        {isLeft ? '◀' : '▶'}
      </span>
    </button>
  );

  return (
    <div
      className='flex justify-center max-w-2/3 m-auto items-center w-1/2'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='flex flex-row items-center'>
        <div className='inline-flex overflow-x-hidden snap-mandatory snap-x'>
          {images.map((img, i) => (
            <figure
              className='w-full flex-shrink-0 '
              key={img.src}
              ref={refs[i]}
            >
              <img
                src={img.src}
                className='w-full object-contain max-h-400px'
                alt={img.alt}
                height={400}
                width={300}
              />
              <div className='flex justify-center md:justify-between items-center md:w-80'>
                {sliderControl(true)}
                <figcaption className='text-lg text-center px-6'>
                  {img.alt}
                </figcaption>
                {sliderControl()}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cavalry;
