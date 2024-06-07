import bachataHector from '../assets/images/bachata-hector.webp';
import bachata from '../assets/images/bachata.webp';
import shetland from '../assets/images/shetland.webp';
import shetlands from '../assets/images/shetlands.webp';
import intrepide from '../assets/images/intrepide.webp';
import isisIntrepide from '../assets/images/isis-intrepide.webp';
import Carousel from './Carousel';
import Section from '../layouts/Section';

const Cavalry = () => {
  const images = [
    {
      src: bachataHector,
      title: 'Hector et Bachata',
      alt: 'Hector et Bachata',
    },
    { src: bachata, title: 'Bachata', alt: 'Bachata' },
    { src: intrepide, title: 'Intrépide', alt: 'Intrépide' },
    {
      src: shetlands,
      title: 'Jazzy, Crunch et Deborah',
      alt: 'Jazzy, Crunch et Deborah',
    },
    { src: shetland, title: 'Crunch', alt: 'Crunch' },
    {
      src: isisIntrepide,
      title: 'Isis et Intrépide',
      alt: 'Isis et Intrépide',
    },
  ];

  return (
    <Section editable={false} title={'Notre cavalerie'} id={'cavalry'}>
      <Carousel medias={images} />
    </Section>
  );
};

export default Cavalry;
