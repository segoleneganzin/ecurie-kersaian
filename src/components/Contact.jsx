import ImportantWord from './ImportantWord';
import Section from '../layouts/Section';

const Contact = () => {
  return (
    <Section editable={false} title={'Contactez-nous'} id={'contact'}>
      <div className='flex flex-col gap-2 lg:flex-row lg:gap-10 justify-center p-2 md:p-0  text-base '>
        <ul className='leading-10'>
          <li>
            <ImportantWord>Adresse : </ImportantWord>
            Kerhouant Vraz, 56440 Languidic{' '}
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
            <ImportantWord>Téléphone : </ImportantWord>
            06 79 89 85 93
          </li>
          <li>
            <ImportantWord>Email : </ImportantWord>
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
          <ImportantWord>Horaires d&apos;ouverture : </ImportantWord>
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
    </Section>
  );
};

export default Contact;
