import PropTypes from 'prop-types';
/**
 * Admin nav for choice whose page to modify
 * @component
 * @param {Object} props
 * @param {function} props.setChoice
 * @returns {JSX.Element}
 */
const ChoicePageAdmin = ({ setChoice }) => {
  return (
    <div className='bg-lime-800  flex flex-col gap-8 items-center justify-center py-6 text-white text-xl lg:flex-row lg:gap-32 2xl:rounded-xl'>
      <a
        className='flex transform transition duration-500 hover:scale-125 cursor-pointer origin-center'
        onClick={() => setChoice('equestrianCenter')}
      >
        <h2>Centre équestre</h2>
      </a>
      <a
        className='flex transform transition duration-500 hover:scale-125 cursor-pointer origin-center'
        onClick={() => setChoice('pension')}
      >
        <h2>Pension</h2>
      </a>
    </div>
  );
};

ChoicePageAdmin.propTypes = {
  setChoice: PropTypes.func.isRequired,
};

export default ChoicePageAdmin;
