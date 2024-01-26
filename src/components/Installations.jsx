const Installations = () => {
  return (
    <div className='p-4 pt-16 lg:p-16 sm:p-8' id='installations'>
      <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Nos installations
      </h2>
      <ul className='leading-10 mt-4 space-y-5 text-principal-color text-sm  lg:text-xl'>
        <li>- Des boxs pour préparer les chevaux</li>
        <li>- Une sellerie</li>
        <li>- Un manège dans une ancienne porcherie réabilitée</li>
        <li>- Une grande carrière</li>
        <li>
          - De nombreux chemins de balades accéssibles directement depuis les
          écuries
        </li>
      </ul>
    </div>
  );
};

export default Installations;
