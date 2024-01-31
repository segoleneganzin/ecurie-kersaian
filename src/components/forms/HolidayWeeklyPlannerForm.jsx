import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { updateHolidayDates } from '../../api/WeeklyPlannerApi';

const HolidayWeeklyPlannerForm = ({
  holidayDateWeeklyPlanner,
  closeModal,
  fetchPlanning,
}) => {
  // ************** CLASSNAMES
  const formClassName = 'mt-4 border-t-2 border-principal-color pt-2';
  const labelClassName = 'pr-2 text-lg font-bold';
  const textareaClassName = 'border border-black pl-2';
  const textareaErrorClassName = 'border border-red-300';
  const buttonClassName =
    'm-auto w-fit rounded-md px-4 py-2 text-white shadow-sm transition ease-in-out duration-150 tracking-wide';

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const inputErrorClass = {
    holidayDates: errors.holidayDates
      ? textareaErrorClassName
      : textareaClassName,
  };
  const inputErrorMessage = {
    holidayDates: errors.holidayDates ? 'Veuillez renseigner les dates' : '',
  };
  //**********************************************place data to input value
  const updateInputDatas = async () => {
    try {
      if (holidayDateWeeklyPlanner) {
        setValue('holidayDates', holidayDateWeeklyPlanner);
      }
    } catch (e) {
      console.log('Error getting cached document:', e);
    }
  };
  useEffect(() => {
    updateInputDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHolidayDatesDisplay = async () => {
    await updateHolidayDates(getValues('holidayDates'));
    // Recharger le planning
    fetchPlanning();
    // Fermer la modale
    closeModal();
  };
  return (
    <form
      onSubmit={handleSubmit(updateHolidayDatesDisplay)}
      className={formClassName}
      noValidate
    >
      <div className='flex flex-col'>
        <label className={labelClassName} htmlFor='holidayDates'>
          Dates de la période :
        </label>
        <textarea
          id='holidayDates'
          name='holidayDates'
          className={inputErrorClass.holidayDates}
          {...register('holidayDates', { required: true })}
        />
      </div>
      {errors.holidayDates && (
        <span className='text-red-800'>{inputErrorMessage.holidayDates}</span>
      )}

      <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <button
          className={buttonClassName + ' bg-green-700 hover:bg-green-500'}
        >
          Valider
        </button>
      </div>
    </form>
  );
};
HolidayWeeklyPlannerForm.propTypes = {
  closeModal: PropTypes.func,
  holidayDateWeeklyPlanner: PropTypes.string,
  setHolidayModalOpen: PropTypes.func,
  fetchPlanning: PropTypes.func,
};
export default HolidayWeeklyPlannerForm;
