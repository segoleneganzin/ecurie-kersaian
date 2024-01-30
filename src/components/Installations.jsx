const Installations = () => {
  return (
    <div className='p-2 pt-16 lg:p-16 sm:p-8' id='installations'>
      <h2 className='text-principal-color font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Nos installations
      </h2>
      <ul className='leading-10 mt-4 space-y-5 text-base '>
        <li>
          Des{' '}
          <span className='color-secondary-color font-bold text-lg'>boxs</span>{' '}
          pour préparer les chevaux
        </li>
        <li>
          Une{' '}
          <span className='color-secondary-color font-bold text-lg'>
            sellerie
          </span>
        </li>
        <li>
          Un{' '}
          <span className='color-secondary-color font-bold text-lg'>
            manège
          </span>{' '}
          (40x10m)
        </li>
        <li>
          Une grande{' '}
          <span className='color-secondary-color font-bold text-lg'>
            carrière
          </span>
        </li>
        <li>
          De{' '}
          <span className='color-secondary-color font-bold text-lg'>
            nombreux chemins de balades
          </span>{' '}
          accéssibles directement depuis les écuries
        </li>
      </ul>
    </div>
  );
};

export default Installations;
