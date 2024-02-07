import { sectionTitleClassName } from '../utils/GeneralClassNames';
const Contact = () => {
  return (
    <section className='p-2 pt-16  sm:p-8 lg:p-16' id='contact'>
      <h2 className={sectionTitleClassName}>Contactez-nous</h2>
      <div className='flex flex-col gap-10 md:flex-row lg:gap-6'>
        <ul className='leading-10 p-2 text-base md:p-0'>
          <li>
            <span className='color-secondary-color font-bold text-lg'>
              Adresse :
            </span>
            Kerhouant Vraz, 56440 Languidic
            <a
              href='https://maps.app.goo.gl/5EoUuYe8artgZYcd8'
              target='_blank'
              rel='noreferrer'
              className='cursor text-sky-700'
            >
              (voir sur Google Map)
            </a>
          </li>
          <li>
            <span className='color-secondary-color font-bold text-lg'>
              Téléphone :
            </span>
            06 79 89 85 93
          </li>
          <li>
            <span className='color-secondary-color font-bold text-lg'>
              Email :
            </span>
            alexia.lemoine@hotmail.fr
          </li>
          <li>
            <a
              href='https://www.facebook.com/people/%C3%89curie-Kersa%C3%AFan/61551107019670/'
              rel='noreferrer'
              target='_blank'
              className='text-white font-bold text-lg bg-sky-700 px-6 py-2 rounded-lg'
            >
              Page Facebook
            </a>
          </li>
          <li>
            <span className='color-secondary-color font-bold text-lg'>
              Horaires d&apos;ouverture :
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Contact;
