import PropTypes from 'prop-types';
import { useState } from 'react';
import { updateHolidayInfos } from '../../../api/WeeklyPlannerApi';
import { Form } from 'sg-form-lib';
import { formFieldsConfig } from '../../../formFieldsconfig';

/**
 * Form for managing vacation dates in the weekly schedule.
 * @param {Object} props
 * @param {string} props.holidayInfosWeeklyPlanner
 * @param {Function} props.setModalOpen
 * @param {Function} props.fetchPlanning
 * @returns {JSX.Element}
 */
const HolidayInfosForm = ({
  holidayInfosWeeklyPlanner,
  setModalOpen,
  fetchPlanning,
}) => {
  // Status to manage validation message in case of error  const [validation, setValidation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const infos = holidayInfosWeeklyPlanner.infos;
  const formattedInfos = infos.join('\n');

  /**
   * Submits vacation dates for updating, reload the schedule, and close the modal.
   */
  const updateHoliday = async (HolidayInfos) => {
    try {
      const lines = HolidayInfos.split('\n');
      const datas = {
        infos: lines,
      };
      await updateHolidayInfos(datas);
      fetchPlanning();
      setModalOpen(false);
    } catch (error) {
      setErrorMessage("Une erreur s'est produite");
    }
  };

  return (
    <Form
      fieldsConfig={formFieldsConfig}
      title={'Gestion des dates'}
      onSubmitFunction={updateHoliday}
      btnText={'Valider'}
      errorMessage={errorMessage}
      fieldNames={['HolidayInfos']}
      fieldValue={{
        HolidayInfos: formattedInfos,
      }}
    />
  );
};

HolidayInfosForm.propTypes = {
  holidayInfosWeeklyPlanner: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  fetchPlanning: PropTypes.func.isRequired,
};

export default HolidayInfosForm;
