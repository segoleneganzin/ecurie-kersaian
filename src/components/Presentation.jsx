import presentationImg from '../assets/images/cc.webp';
import ImportantWord from './ImportantWord';

const Presentation = () => {
  const presentationSectionClassName =
    'p-2 pt-4 gap-6 flex justify-center flex-col sm:p-8 lg:p-16 lg:pt-2 lg:flex-row xl:pt-0 xl:gap-16 xl:items-center animate-fadeIn';
  const presentationImgClassName =
    'relative h-[300px] m-auto w-[300px] object-cover object-bottom rounded-md sm:rounded-full shadow-lg lg:h-[420px] lg:rounded-md xl:rounded-full xl:h-[450px] xl:w-[450px] lg:top-0';
  const presentationParagraphClassName =
    'leading-8 text-center lg:text-left text-base';
  const presentationButtonContainerClassName =
    'items-center mt-8 flex flex-col gap-5 md:flex-row md:justify-center lg:justify-start';
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
          <ImportantWord>Languidic</ImportantWord>,
          <br /> l&apos;écurie Kersaian est{' '}
          <ImportantWord>dirigée par Alexia Lemoine</ImportantWord>
          .
          <br />
          Depuis 2023, notre écurie est le point de rendez-vous idéal pour tous
          les passionnés de chevaux. <br />
          <br />À l&apos;écurie Kersaian, on mise sur le{' '}
          <ImportantWord>respect des chevaux</ImportantWord>, la
          <ImportantWord> sécurité des cavaliers</ImportantWord>
          , et une vraie connexion avec nos copains à quatre pattes. <br />
          On adore la vie en plein air et{' '}
          <ImportantWord>nos chevaux vivent au pré</ImportantWord>, loin du
          stress de la ville.
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
