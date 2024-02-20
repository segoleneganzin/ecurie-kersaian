import {
  sectionTitleClassName,
  sectionClassName,
} from '../utils/GeneralClassNames';
const Installations = () => {
  return (
    <section className={sectionClassName} id='installations'>
      <h2 className={sectionTitleClassName}>Nos installations</h2>
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
          (40x16m)
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
    </section>
  );
};

export default Installations;
