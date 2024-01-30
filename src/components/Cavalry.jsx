import { useState, createRef } from 'react';
// carousel img
import bachataHector from '../assets/images/bachata-hector.jpg';
import bachata from '../assets/images/bachata.jpg';
import shetland from '../assets/images/shetland.jpg';
import shetlands from '../assets/images/shetlands.jpg';

const Cavalry = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const images = [
    { src: bachataHector, alt: 'Hector et Bachata' },
    { src: bachata, alt: 'Bachata' },
    { src: shetlands, alt: 'Les shetlands' },
    { src: shetland, alt: 'Un shetland' },
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
      className='text-principal-color text-xl z-10 lg:mx-6 h-10 w-10 rounded-full opacity-75 flex items-center justify-center'
    >
      <span role='img' aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? '◀' : '▶'}
      </span>
    </button>
  );

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
