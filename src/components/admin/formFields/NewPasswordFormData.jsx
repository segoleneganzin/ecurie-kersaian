import PropTypes from 'prop-types';
import {
  labelClassName,
  formDataContainerClassName,
  errorMessageClassName,
} from '../../../utils/GeneralClassNames';

// use for new password and password confirmation inputs
const NewPasswordFormData = ({
  inputErrorClass,
  register,
  errors,
  inputErrorMessage,
  confirmation = false,
}) => {
  const inputName = confirmation ? 'newPasswordConfirmation' : 'newPassword';
  const errorName = confirmation
    ? errors.newPasswordConfirmation
    : errors.newPassword;
  const inputErrorMessageName = confirmation
    ? inputErrorMessage.newPasswordConfirmation
    : inputErrorMessage.newPassword;

  const label = confirmation
    ? 'Confirmer le mot de passe :'
    : 'Nouveau mot de passe :';

  return (
    <div className={formDataContainerClassName}>
      <label htmlFor='newPassword' className={labelClassName}>
        {label}
      </label>
      <input
        id={inputName}
        name={inputName}
        type='password'
        className={inputErrorClass('newPassword')}
        {...register(inputName, {
          required: true,
          pattern:
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        })}
      />
      {errorName?.type === 'required' && (
        <span className={errorMessageClassName}>{inputErrorMessageName}</span>
      )}
      {errorName?.type === 'pattern' && (
        <span className={errorMessageClassName}>
          Le mot de passe n&apos;est pas valide
        </span>
      )}
    </div>
  );
};
NewPasswordFormData.propTypes = {
  inputErrorClass: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inputErrorMessage: PropTypes.object.isRequired,
  confirmation: PropTypes.bool,
};
export default NewPasswordFormData;
