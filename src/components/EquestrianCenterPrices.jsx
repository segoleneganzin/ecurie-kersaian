import prices from '../assets/images/prices.jpg';

const Prices = () => {
  return (
    <div className='p-2 pt-16 lg:p-16 sm:p-8' id='prices'>
      <h2 className='font-bold pb-10 text-5xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Les tarifs
      </h2>
      <img
        src={prices}
        alt='Grille des tarifs'
        className='shadow-lg m-auto mt-4'
      />
    </div>
  );
};

export default Prices;
