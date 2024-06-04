import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const Carousel = ({ medias }) => {
  const previousCarouselMedia = useRef();
  const nextCarouselMedia = useRef();
  const [currentMedia, setCurrentMedia] = useState(medias[0]);

  /**
   * manage media to display depends of its index
   * @returns object
   */
  const manageCarousel = (direction) => {
    const srcMedia = currentMedia.src;
    let mediaIndex = medias.findIndex((media) => media.src === srcMedia);
    if (direction === 'previous') {
      currentMedia === medias[0]
        ? setCurrentMedia(medias[medias.length - 1])
        : setCurrentMedia(medias[mediaIndex - 1]);
    }
    if (direction === 'next') {
      currentMedia === medias[medias.length - 1]
        ? setCurrentMedia(medias[0])
        : setCurrentMedia(medias[mediaIndex + 1]);
    }
  };

  return (
    <div className='mt-4 flex flex-row items-center justify-center'>
      <a
        ref={previousCarouselMedia}
        onClick={() => manageCarousel('previous')}
        aria-label='image précédente'
        aria-controls='display-medias'
        className='cursor-pointer'
      >
        <svg
          className='h-10 w-10'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='96'
          height='96'
          viewBox='0 0 96 96'
          fill='none'
        >
          <g clipPath='url(#clip0_120_800)'>
            <path
              d='M61.6399 66.36L43.3199 48L61.6399 29.64L55.9999 24L31.9999 48L55.9999 72L61.6399 66.36Z'
              fill='#353130'
            />
          </g>
        </svg>
      </a>
      <div id='display-medias' aria-live='polite'>
        <div>
          <img
            src={currentMedia.src}
            className='w-full object-contain max-h-400px rounded-md'
            alt={currentMedia.alt}
            height={400}
            width={300}
            tabIndex={0}
          />
          <p className='text-center' aria-hidden='true'>
            {currentMedia.title}
          </p>
        </div>
      </div>
      <a
        ref={nextCarouselMedia}
        onClick={() => manageCarousel('next')}
        aria-label='image suivante'
        aria-controls='display-medias'
        className='cursor-pointer'
      >
        <svg
          className='h-10 w-10'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='96'
          height='96'
          viewBox='0 0 96 96'
          fill='none'
        >
          <g clipPath='url(#clip0_120_803)'>
            <path
              d='M34.3601 29.64L52.6801 48L34.3601 66.36L40.0001 72L64.0001 48L40.0001 24L34.3601 29.64Z'
              fill='#353130'
            />
          </g>
        </svg>
      </a>
    </div>
  );
};
Carousel.propTypes = {
  medias: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Carousel;
