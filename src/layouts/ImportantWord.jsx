import PropTypes from 'prop-types';
/**
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The child elements of the layout.
 * @returns {JSX.Element} The JSX element for the form data layout.
 */
const ImportantWord = ({ children }) => {
  return (
    <span className='color-secondary-color font-bold text-lg'>{children}</span>
  );
};
ImportantWord.propTypes = {
  children: PropTypes.string,
};
export default ImportantWord;
