import lessonImg from '../assets/images/cours.webp';
import walkImg from '../assets/images/balade.webp';
import eventImg from '../assets/images/saian.webp';
import ImportantWord from '../layouts/ImportantWord';
import Section from '../layouts/Section';

const Activities = () => {
  const imgClassNames =
    'h-[300px] m-auto max-w-[300px] min-w-[300px] object-cover object-bottom rounded-md lg:rounded-full shadow-lg';
  const itemListClassNames =
    'flex flex-col lg:flex-row lg:items-center lg:gap-12';
  const paragraphClassNames = 'px-11';

  return (
    <Section editable={false} title={'Nos activités'} id={'activities'}>
      <ul className='leading-10 mt-4 space-y-5 text-base text-center lg:text-left lg:space-y-0 lg:flex lg:flex-col lg:gap-6 lg:items-start'>
        <li className={itemListClassNames}>
          <img
            src={lessonImg}
            alt="cours d'équitation"
            className={imgClassNames}
            width={300}
            height={300}
          />
          <p className={paragraphClassNames}>
            Des <ImportantWord>cours</ImportantWord> pour tout le monde à partir
            de 2 ans, encadrés par Alexia
          </p>
        </li>
        <li className={itemListClassNames}>
          <img
            src={walkImg}
            alt='Shetlands dans la forêt'
            className={imgClassNames}
            width={300}
            height={324}
          />
          <p className={paragraphClassNames}>
            Des <ImportantWord>balades</ImportantWord> au départ du club
          </p>
        </li>
        <li className={itemListClassNames}>
          <img
            src={eventImg}
            alt='Cheval qui saute un obstacle'
            className={imgClassNames}
            width={300}
            height={300}
          />
          <p className={paragraphClassNames}>
            Des événements, des sorties en{' '}
            <ImportantWord>compétitions</ImportantWord>, des{' '}
            <ImportantWord>balades à la plage</ImportantWord> et des{' '}
            <ImportantWord>stages</ImportantWord> pendant les vacances
          </p>
        </li>
      </ul>
    </Section>
  );
};

export default Activities;
