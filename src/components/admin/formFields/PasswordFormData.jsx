import PropTypes from 'prop-types';
import {
  formDataContainerClassName,
  labelClassName,
  errorMessageClassName,
} from '../../../utils/GeneralClassNames';

const PasswordFormData = ({
  inputErrorClass,
  register,
  errors,
  inputErrorMessage,
}) => {
  return (
    <div className={formDataContainerClassName}>
      <label htmlFor='password' className={labelClassName}>
        Mot de passe
      </label>
      <input
        id='password'
        name='password'
        type='password'
        className={inputErrorClass('password')}
        {...register('password', { required: true })}
      />
      {errors.password && (
        <p className={errorMessageClassName}>{inputErrorMessage.password}</p>
      )}
    </div>
  );
};
PasswordFormData.propTypes = {
  inputErrorClass: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inputErrorMessage: PropTypes.object.isRequired,
};
export default PasswordFormData;
