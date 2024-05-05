import PropTypes from 'prop-types';
import {
  labelClassName,
  formDataContainerClassName,
  errorMessageClassName,
} from '../../../utils/GeneralClassNames';

const EmailFormData = ({
  inputErrorClass,
  register,
  errors,
  inputErrorMessage,
}) => {
  return (
    <div className={formDataContainerClassName}>
      <label htmlFor='email' className={labelClassName}>
        Email
      </label>
      <input
        id='email'
        name='email'
        type='email'
        className={inputErrorClass('email')}
        {...register('email', {
          required: true,
          pattern: /\S+@\S+\.\S+/,
        })}
      />
      {errors.email?.type === 'required' && (
        <p className={errorMessageClassName}>{inputErrorMessage.email}</p>
      )}
      {errors.email?.type === 'pattern' && (
        <p className={errorMessageClassName}> Email invalide</p>
      )}
    </div>
  );
};
EmailFormData.propTypes = {
  inputErrorClass: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inputErrorMessage: PropTypes.object.isRequired,
};
export default EmailFormData;
