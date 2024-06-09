import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Section from '../layouts/Section';
import Modal from '../layouts/Modal';
import PlannerForm from './admin/forms/PlannerForm';
import { fetchPlannerApi } from '../api/PlannerApi';

/**
 * Component for display weekly planner picture
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.editable
 * @returns {JSX.Element}
 */
const Planner = ({ editable = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const [plannerPicture, setPlannerPicture] = useState('');
  const [planner, setPlanner] = useState(null);
  // const [plannerInfos, setPlannerInfos] = useState('');

  const SubtitleTag = editable ? 'h4' : 'h3';
  let idLine = 0;

  /**
   * Function to retrieve the schedule from the API.
   * @async
   * @function
   */
  const fetchPlanner = async () => {
    try {
      const plannerDb = await fetchPlannerApi();
      setPlanner(plannerDb);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPlanner();
  }, []);

  return (
    <Section editable={editable} title={'Notre planning'} id={'planning'}>
      <>
        <SubtitleTag className='text-principal-color font-bold text-2xl pl-2 md:pl-0  md:text-center'>
          Vacances scolaires
        </SubtitleTag>
        <div className='flex gap-8 md:justify-center items-center w-full pl-2 sm:pl-8 pt-0 md:pl-0 '>
          <p className='italic md:text-center'>
            {planner &&
              planner.infos.map((line) => {
                idLine += 1;
                return (
                  <span key={idLine}>
                    {line}
                    <br />
                  </span>
                );
              })}
          </p>
          {editable && (
            <button
              onClick={() => setModalOpen(true)}
              className='h-6 w-6 absolute right-24 md:right-52 lg:right-80 xl:right-96'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path
                  fill='#033e0c'
                  d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z'
                />
              </svg>
            </button>
          )}
        </div>
        {planner && (
          <img src={planner.picture} alt='planning' className='m-auto' />
        )}
        {/* Modal to add a new picture */}
        {isModalOpen && (
          <Modal
            title={'Modifier le planning'}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
          >
            <PlannerForm
              fetchPlanner={fetchPlanner}
              setModalOpen={setModalOpen}
              planner={planner}
            />
          </Modal>
        )}
      </>
    </Section>
  );
};
Planner.propTypes = {
  editable: PropTypes.bool,
};
export default Planner;
