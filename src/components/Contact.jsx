const Contact = () => {
  return (
    <div className='p-2 pt-16  sm:p-8 lg:p-16' id='contact'>
      <h2 className='font-bold pb-10 text-4xl w-fit after:absolute after:bg-secondary-color after:block after:h-1 after:mt-4 after:w-56'>
        Contactez-nous
      </h2>
      <div className='flex flex-col gap-10 md:flex-row lg:gap-6'>
        <ul className='leading-10 p-2 text-base text-principal-color md:p-0'>
          <li>
            <span className='color-secondary-color font-bold text-lg'>
              Adresse :
            </span>{' '}
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
            <span className='color-secondary-color font-bold text-lg'>
              Téléphone :
            </span>{' '}
          </li>
          <li>
            <span className='color-secondary-color font-bold text-lg'>
              Email :
            </span>{' '}
          </li>
          <li>
            <span className='color-secondary-color font-bold text-lg'>
              Page Facebook :
            </span>{' '}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
