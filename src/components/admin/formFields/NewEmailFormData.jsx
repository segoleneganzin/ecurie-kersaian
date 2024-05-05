import PropTypes from 'prop-types';
import {
  labelClassName,
  formDataContainerClassName,
  errorMessageClassName,
} from '../../../utils/GeneralClassNames';

const NewEmailFormData = ({
  inputErrorClass,
  register,
  errors,
  inputErrorMessage,
}) => {
  return (
    <div className={formDataContainerClassName}>
      <label htmlFor='newEmail' className={labelClassName}>
        Nouvel e-mail :
      </label>
      <input
        id='newEmail'
        name='newEmail'
        type='email'
        className={inputErrorClass('newEmail')}
        {...register('newEmail', {
          required: true,
          pattern: /\S+@\S+\.\S+/,
        })}
      />
      {errors.newEmail?.type === 'required' && (
        <p className={errorMessageClassName}>{inputErrorMessage.newEmail}</p>
      )}
      {errors.newEmail?.type === 'pattern' && (
        <p className={errorMessageClassName}> Email invalide</p>
      )}
    </div>
  );
};
NewEmailFormData.propTypes = {
  inputErrorClass: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inputErrorMessage: PropTypes.object.isRequired,
};
export default NewEmailFormData;
