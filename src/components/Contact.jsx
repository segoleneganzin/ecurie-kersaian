import {
  sectionTitleClassName,
  sectionClassName,
} from '../utils/GeneralClassNames';
const Contact = () => {
  return (
    <section className={sectionClassName} id='contact'>
      <h2 className={sectionTitleClassName}>Contactez-nous</h2>
      <div className='flex flex-col gap-2 lg:flex-row lg:gap-10 justify-center p-2 md:p-0  text-base '>
        <ul className='leading-10'>
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
        </ul>
        <div className='space-y-2'>
          <p className='color-secondary-color font-bold text-lg py-1'>
            Horaires d&apos;ouverture :
          </p>
          <ul className='ml-6'>
            <li>Lundi : 9h00 - 18h00</li>
            <li>Mardi : 9h00 - 18h30</li>
            <li>Mercredi : 9h00 - 18h00</li>
            <li>Jeudi : 9h00 - 19h30</li>
            <li>Vendredi : 9h00 - 18h30</li>
            <li>Samedi : 9h00 - 16h00</li>
            <li>Dimanche : fermé</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;
