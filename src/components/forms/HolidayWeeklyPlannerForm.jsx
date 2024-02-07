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
 * Formulaire pour la gestion des dates de période de congé dans le planning hebdomadaire.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.holidayDateWeeklyPlanner - Les dates de congé existantes.
 * @param {Function} props.closeModal - Fonction pour fermer le modal.
 * @param {Function} props.fetchPlanning - Fonction pour recharger le planning.
 * @returns {JSX.Element} - Élément de formulaire React.
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
   * Obtenir la classe d'erreur pour le champ des dates de congé.
   */
  const inputErrorClass = {
    holidayDates: errors.holidayDates
      ? textareaErrorClassName
      : textareaClassName,
  };

  /**
   * Obtenir le message d'erreur pour le champ des dates de congé.
   */
  const inputErrorMessage = {
    holidayDates: errors.holidayDates ? 'Veuillez renseigner les dates' : '',
  };

  //********************************************** Mettre les données dans la valeur du champ
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
   * Mettre à jour l'affichage des dates de congé.
   * Soumet les dates de congé pour mise à jour, recharge le planning, et ferme le modal.
   */
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
