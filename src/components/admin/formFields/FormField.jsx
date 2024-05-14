import PropTypes from 'prop-types';
import {
  formDataContainerClassName,
  labelClassName,
  errorMessageClassName,
} from '../../../utils/GeneralClassNames';

const FormField = ({
  tag: Tag,
  name,
  label,
  type,
  pattern,
  isRequired,
  inputErrorClass,
  register,
  errors,
  inputErrorMessage,
}) => {
  return (
    <div className={formDataContainerClassName}>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <Tag
        id={name}
        name={name}
        type={type}
        className={inputErrorClass(name)}
        {...register(name, { required: isRequired, pattern: pattern })}
      />
      {errors[name]?.type === 'required' && (
        <p className={errorMessageClassName}>{inputErrorMessage[name]}</p>
      )}
      {errors[name]?.type === 'pattern' && (
        <p className={errorMessageClassName}> Champ invalide</p>
      )}
    </div>
  );
};
FormField.propTypes = {
  tag: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  pattern: PropTypes.instanceOf(RegExp),
  isRequired: PropTypes.bool,
  inputErrorClass: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inputErrorMessage: PropTypes.object.isRequired,
};
export default FormField;
