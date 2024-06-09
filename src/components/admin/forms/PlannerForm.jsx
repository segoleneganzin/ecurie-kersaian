import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Resizer from 'react-image-file-resizer';
import { updatePlannerApi } from '../../../api/PlannerApi';
import { useForm } from 'react-hook-form';
import {
  labelClassName,
  formDataContainerClassName,
  formClassName,
  inputClassName,
  inputErrorClassName,
  buttonClassName,
  errorMessageClassName,
} from '../../../utils/GeneralClassNames';

/**
 * Modal component to add or modify a time slot in the weekly schedule.
 * @component
 * @param {Object} props
 * @param {function} props.fetchPlanning
 * @param {Function} props.setModalOpen
 * @param {Object} props.weeklyPlanner
 * @returns {JSX.Element}
 */
const PlannerForm = ({ fetchPlanner, setModalOpen, planner }) => {
  const formattedPlannerInfos = planner.infos.join('\n');
  const [errorMessage, setErrorMessage] = useState('');
  const [preview, setPreview] = useState(planner.picture);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  /**
   * Function to obtain the error class for a given field.
   * @param {string} field
   * @returns {string} - Field error class.
   */
  const inputErrorClass = (field) => {
    return errors[field] ? inputErrorClassName : inputClassName;
  };

  /**
   * Effect to set initial values for fields if provided.
   * e.g. for update form
   */
  useEffect(() => {
    const fetchPost = async () => {
      setValue('plannerInfos', formattedPlannerInfos);
    };
    fetchPost();
  }, [setValue, planner, formattedPlannerInfos]);

  const convertPicture = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        1000,
        1000,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64',
        (err) => {
          reject(err);
        }
      );
    });
  };

  const pictureOnChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resizedImage = await convertPicture(file);
        setPreview(resizedImage);
        setValue('plannerPicture', resizedImage);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
  };

  /**
   * Adds or modifies the time slot in the schedule.
   */
  const addPlanner = async () => {
    try {
      const plannerDatas = {
        picture: preview ? preview : planner.picture, // manage actual picture deletation if user doesn't set picture,
        infos: getValues('plannerInfos').split('\n'),
      };
      await updatePlannerApi(plannerDatas);
      fetchPlanner();
      setModalOpen(false);
    } catch {
      setErrorMessage("Une erreur s'est produite");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addPlanner)}
      className={formClassName}
      noValidate
    >
      <div className={formDataContainerClassName}>
        {/* label */}
        <label htmlFor='plannerInfos' className={labelClassName}>
          Informations facultatives :
        </label>
        <textarea
          id='plannerInfos'
          name='plannerInfos'
          type='text'
          className={inputErrorClass('plannerInfos') + ' w-20'}
          {...register('plannerInfos')}
        />
      </div>
      <div className={formDataContainerClassName}>
        {/* label */}
        <label htmlFor='plannerPicture' className={labelClassName}>
          Image :
        </label>
        <input
          id='plannerPicture'
          name='plannerPicture'
          type='file'
          accept='image/png, image/jpeg'
          className={inputErrorClass('plannerPicture') + ' w-20'}
          {...register('plannerPicture', {
            onChange: (e) => pictureOnChange(e),
          })}
        />
        {preview && (
          <img
            src={preview}
            alt='Image actuelle'
            className='mt-2'
            style={{ width: '300px', height: 'auto' }}
          />
        )}
      </div>
      <p className={errorMessageClassName}>{errorMessage}</p>
      <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
        <button
          className={buttonClassName + ' bg-green-700 hover:bg-green-500'}
        >
          Valider
        </button>
      </div>
    </form>
  );
};

PlannerForm.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  fetchPlanner: PropTypes.func.isRequired,
  planner: PropTypes.object.isRequired,
};

export default PlannerForm;
