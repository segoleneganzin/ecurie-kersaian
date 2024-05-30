import PropTypes from 'prop-types';

const ChoicePageAdmin = ({ setChoice }) => {
  return (
    <div className='bg-principal-color flex flex-col gap-16 items-center justify-center pb-16 text-gray-400 text-xl lg:flex-row lg:gap-32 2xl:rounded-b-xl'>
      <a
        className='flex transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer origin-bottom'
        onClick={() => setChoice('equestrianCenter')}
      >
        <h2>Centre équestre</h2>
      </a>
      <a
        className='flex transform transition duration-500 hover:scale-125 hover:text-white cursor-pointer origin-bottom'
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
