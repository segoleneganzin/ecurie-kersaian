import PropTypes from 'prop-types';
import FormField from './FormField';

const FormFieldManager = ({
  fieldName,
  inputErrorClass,
  register,
  errors,
  inputErrorMessage,
}) => {
  let tag, label, type, pattern;
  let isRequired = true;
  switch (fieldName) {
    case 'email':
      (tag = 'input'),
        (label = 'Email'),
        (type = 'email'),
        (pattern = /\S+@\S+\.\S+/);
      break;
    case 'newEmail':
      (tag = 'input'),
        (label = 'Nouvel e-mail :'),
        (type = 'email'),
        (pattern = /\S+@\S+\.\S+/);
      break;
    case 'newPassword':
      (tag = 'input'),
        (label = 'Nouveau mot de passe :'),
        (type = 'password'),
        (pattern =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
      break;
    case 'newPasswordConfirmation':
      (tag = 'input'),
        (label = 'Confirmer le mot de passe :'),
        (type = 'password'),
        (pattern =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
      break;
    case 'password':
      (tag = 'input'),
        (label = 'Mot de passe'),
        (type = 'password'),
        (pattern = null);
      break;
    default:
      return null;
  }
  return (
    <FormField
      tag={tag}
      name={fieldName}
      label={label}
      type={type}
      pattern={pattern}
      isRequired={isRequired}
      inputErrorClass={inputErrorClass}
      register={register}
      errors={errors}
      inputErrorMessage={inputErrorMessage}
    />
  );
};
FormFieldManager.propTypes = {
  fieldName: PropTypes.string,
  inputErrorClass: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inputErrorMessage: PropTypes.object.isRequired,
  confirmation: PropTypes.bool,
};

export default FormFieldManager;
