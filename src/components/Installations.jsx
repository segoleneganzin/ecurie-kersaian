import Section from '../layouts/Section';
import ImportantWord from './ImportantWord';

const Installations = () => {
  return (
    <Section editable={false} title={'Nos installations'} id={'installations'}>
      <ul className='leading-10 mt-4 space-y-5 text-base pl-2'>
        <li>
          Des <ImportantWord>boxs</ImportantWord> pour préparer les chevaux
        </li>
        <li>
          Une <ImportantWord>sellerie</ImportantWord>
        </li>
        <li>
          Un <ImportantWord>manège</ImportantWord> (40x16m)
        </li>
        <li>
          Une grande <ImportantWord>carrière</ImportantWord>
        </li>
        <li>
          De <ImportantWord>nombreux chemins de balades</ImportantWord>{' '}
          accessibles directement depuis les écuries
        </li>
      </ul>
    </Section>
  );
};

export default Installations;
