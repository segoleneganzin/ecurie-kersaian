import lessonImg from '../assets/images/cours.webp';
import walkImg from '../assets/images/balade.webp';
import eventImg from '../assets/images/saian.webp';
import {
  sectionTitleClassName,
  sectionClassName,
} from '../utils/GeneralClassNames';

const Activities = () => {
  return (
    <section className={sectionClassName} id='activities'>
      <h2 className={sectionTitleClassName}>Nos activités</h2>
      <ul className='leading-10 mt-4 space-y-5 text-base text-center lg:text-left lg:space-y-0 lg:flex lg:flex-col lg:gap-6 lg:items-start'>
        <li className='flex flex-col lg:flex-row lg:items-center lg:gap-12'>
          <img
            src={lessonImg}
            alt="cours d'équitation"
            className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg'
            width={300}
            height={300}
          />
          <span>
            Des{' '}
            <span className='color-secondary-color font-bold text-lg'>
              cours
            </span>{' '}
            pour tout le monde à partir de 2 ans, encadrés par Alexia
          </span>
        </li>
        <li className='flex flex-col lg:flex-row lg:items-center lg:gap-12'>
          <img
            src={walkImg}
            alt='Shetlands dans la forêt'
            className='h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg'
            width={300}
            height={324}
          />
          <span>
            Des{' '}
            <span className='color-secondary-color font-bold text-lg'>
              balades
            </span>{' '}
            au départ du club
          </span>
        </li>
        <li className='flex flex-col lg:flex-row lg:items-center lg:gap-12'>
          <img
            src={eventImg}
            alt='Cheval qui saute un obstacle'
            className='h-300px m-auto max-w-300px min-w-300px object-cover object-right-top rounded-full shadow-lg '
            width={300}
            height={300}
          />
          <span>
            Des événements, des sorties en{' '}
            <span className='color-secondary-color font-bold text-lg'>
              compétitions
            </span>
            , des{' '}
            <span className='color-secondary-color font-bold text-lg'>
              balades à la plage
            </span>{' '}
            et des{' '}
            <span className='color-secondary-color font-bold text-lg'>
              stages
            </span>{' '}
            pendant les vacances
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Activities;
