import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormField from './formFields/FormField';
import {
  formClassName,
  buttonClassName,
  inputErrorClassName,
  inputClassName,
  formDataContainerClassName,
} from '../../utils/GeneralClassNames';

const Form = ({
  onSubmitFunction,
  btnText,
  title,
  subtitle,
  validation,
  fieldNames,
  classnames,
}) => {
  // Destructuring properties from the useForm hook
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  /**
   * Function to get the error class for a given field.
   * @param {string} field - Name of the field.
   * @returns {string} - Error class for the field.
   */
  const inputErrorClass = (field) => {
    return errors[field]
      ? inputErrorClassName + ' min-w-52'
      : inputClassName + ' min-w-52';
  };

  // Error messages for input validation
  const inputErrorMessage = {
    email: errors.email ? 'Veuillez entrer votre email' : '',
    password: errors.password ? 'Veuillez entrer votre mot de passe' : '',
    newPassword: errors.newPassword ? 'Veuillez rentrer un mot de passe' : '',
    newPasswordConfirmation: errors.newPasswordConfirmation
      ? 'Veuillez rentrer un mot de passe identique'
      : '',
  };

  return (
    <form
      onSubmit={handleSubmit(() =>
        onSubmitFunction(...fieldNames.map((fieldName) => getValues(fieldName)))
      )}
      className={formClassName + classnames}
      noValidate
    >
      {/* TODO manage h level */}
      {title && (
        <h2 className='text-white text-xl text-center font-bold bg-red-900 rounded-t-sm mb-4'>
          {title}
        </h2>
      )}
      {subtitle && <p className={formDataContainerClassName}>{subtitle}</p>}

      {fieldNames.map((fieldName, index) => {
        const confirmation =
          fieldName === 'newPasswordConfirmation' ? true : false;
        return (
          <FormField
            key={index}
            fieldName={fieldName}
            inputErrorClass={inputErrorClass}
            register={register}
            errors={errors}
            inputErrorMessage={inputErrorMessage}
            confirmation={confirmation}
          />
        );
      })}
      <p className='validation error'>{validation}</p>
      <button
        className={
          buttonClassName +
          ' bg-green-700 hover:bg-green-600 flex justify-center'
        }
      >
        {btnText}
      </button>
    </form>
  );
};
Form.propTypes = {
  onSubmitFunction: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  validation: PropTypes.string,
  fieldNames: PropTypes.arrayOf(PropTypes.string),
  origin: PropTypes.string,
  classnames: PropTypes.string,
};
export default Form;
