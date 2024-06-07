import PropTypes from 'prop-types';

const ImportantWord = ({ children }) => {
  return (
    <span className='color-secondary-color font-bold text-lg'>{children}</span>
  );
};
ImportantWord.propTypes = {
  children: PropTypes.string,
};
export default ImportantWord;
