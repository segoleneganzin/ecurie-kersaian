import presentationImg from '../assets/images/cc.webp';

const Presentation = () => {
  const presentationSectionClassName =
    'p-2 pt-16 gap-6 flex justify-center flex-col sm:p-8 lg:p-16 xl:items-center xl:flex-row';
  const presentationImgClassName =
    'h-300px m-auto max-w-300px min-w-300px object-cover object-bottom rounded-full shadow-lg md:h-650px md:max-w-650px md:min-w-650px';
  const presentationParagraphClassName =
    'leading-8 text-center xl:text-left text-base';
  const presentationButtonContainerClassName =
    'items-center mt-8 flex flex-col gap-5 md:flex-row md:justify-center xl:justify-start';
  const presentationButtonClassName =
    'bg-secondary-color cursor-pointer p-6 rounded-lg shadow-lg text-white tracking-widest w-fit transform transition duration-400 hover:bg-principal-color';

  return (
    <section className={presentationSectionClassName}>
      <img
        src={presentationImg}
        alt='Couleur café qui tire la langue'
        className={presentationImgClassName}
        width={650}
        height={650}
      />
      <div>
        <p className={presentationParagraphClassName}>
          Située au cœur de la campagne de{' '}
          <span className='font-bold text-xl'>Languidic</span>,
          <br /> l&apos;écurie Kersaian est{' '}
          <span className='font-bold text-xl'>dirigée par Alexia Lemoine</span>
          .
          <br />
          Depuis 2023, notre écurie est le point de rendez-vous idéal pour tous
          les passionnés de chevaux. <br />
          <br />À l&apos;écurie Kersaian, on mise sur le{' '}
          <span className='font-bold text-xl'>respect des chevaux</span>, la
          <span className='font-bold text-xl'> sécurité des cavaliers</span>
          , et une vraie connexion avec nos copains à quatre pattes. <br />
          On adore la vie en plein air et{' '}
          <span className='font-bold text-xl'>nos chevaux vivent au pré</span>,
          loin du stress de la ville.
        </p>
        <div className={presentationButtonContainerClassName}>
          <a href='#contact' className={presentationButtonClassName}>
            Nous situer
          </a>
          <a href='#contact' className={presentationButtonClassName}>
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
};
export default Presentation;
