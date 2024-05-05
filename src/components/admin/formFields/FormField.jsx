import PropTypes from 'prop-types';
import EmailFormData from './EmailFormData';
import PasswordFormData from './PasswordFormData';
import NewPasswordFormData from './NewPasswordFormData';
import NewEmailFormData from './NewEmailFormData';

const FormField = ({
  fieldName,
  inputErrorClass,
  register,
  errors,
  inputErrorMessage,
  confirmation = false,
}) => {
  let Component;
  switch (fieldName) {
    case 'email':
      Component = EmailFormData;
      break;
    case 'newEmail':
      Component = NewEmailFormData;
      break;
    case 'newPassword':
      Component = NewPasswordFormData;
      break;
    case 'newPasswordConfirmation':
      Component = NewPasswordFormData;
      break;
    case 'password':
      Component = PasswordFormData;
      break;
    default:
      return null;
  }
  return (
    <Component
      inputErrorClass={inputErrorClass}
      register={register}
      errors={errors}
      inputErrorMessage={inputErrorMessage}
      confirmation={confirmation}
    />
  );
};
FormField.propTypes = {
  fieldName: PropTypes.string,
  inputErrorClass: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inputErrorMessage: PropTypes.object.isRequired,
  confirmation: PropTypes.bool,
};

export default FormField;
