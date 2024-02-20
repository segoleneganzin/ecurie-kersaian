import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { updateHolidayDates } from '../../api/WeeklyPlannerApi';
import {
  formClassName,
  labelClassName,
  textareaContainerClassName,
  textareaClassName,
  textareaErrorClassName,
  errorMessageClassName,
  buttonClassName,
} from '../../utils/GeneralClassNames';
/**
 * Form for managing vacation dates in the weekly schedule.
 * @param {Object} props
 * @param {string} props.holidayDateWeeklyPlanner
 * @param {Function} props.closeModal
 * @param {Function} props.fetchPlanning
 * @returns {JSX.Element}
 */
const HolidayWeeklyPlannerForm = ({
  holidayDateWeeklyPlanner,
  closeModal,
  fetchPlanning,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  /**
   * Manage the error class for the vacation dates field.
   */
  const inputErrorClass = {
    holidayDates: errors.holidayDates
      ? textareaErrorClassName
      : textareaClassName,
  };

  /**
   * Manage error message for vacation dates field.
   */
  const inputErrorMessage = {
    holidayDates: errors.holidayDates ? 'Veuillez renseigner les dates' : '',
  };

  // Fill fields with datas
  const updateInputDatas = async () => {
    try {
      if (holidayDateWeeklyPlanner) {
        setValue('holidayDates', holidayDateWeeklyPlanner);
      }
    } catch (e) {
      console.log(
        'Erreur lors de la récupération du document mis en cache :',
        e
      );
    }
  };

  useEffect(() => {
    updateInputDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Submits vacation dates for updating, reload the schedule, and close the modal.
   */
  const updateHolidayDatesDisplay = async () => {
    await updateHolidayDates(getValues('holidayDates'));
    fetchPlanning();
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(updateHolidayDatesDisplay)}
      className={formClassName}
      noValidate
    >
      <div className={textareaContainerClassName}>
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
        <span className={errorMessageClassName}>
          {inputErrorMessage.holidayDates}
        </span>
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
  fetchPlanning: PropTypes.func,
};

export default HolidayWeeklyPlannerForm;
