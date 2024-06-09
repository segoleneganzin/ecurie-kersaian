import PropTypes from 'prop-types';
import {
  labelClassName,
  formDataContainerClassName,
  errorMessageClassName,
} from '../utils/GeneralClassNames';

/**
 * FormDataLayout component handles the layout of form data.
 *
 * @param {Object} props - The properties object.
 * @param {JSX.Element} props.children - The child elements of the layout.
 * @param {string} props.fieldName - The name of the field.
 * @param {Object} props.field - The field configuration object.
 * @param {Object} props.errors - The errors object.
 * @returns {JSX.Element} The JSX element for the form data layout.
 */
const FormDataLayout = ({ children, fieldName, field, errors }) => {
  return (
    <div className={formDataContainerClassName}>
      {/* label */}
      <label htmlFor={fieldName} className={labelClassName}>
        {field.label}
      </label>
      {/* content */}
      {children}
      {/* error message */}
      <p className={errorMessageClassName}>
        {errors[fieldName]?.type === 'required' && (
          <>{field.fieldErrorMessage}</>
        )}
        {errors[fieldName]?.type === 'pattern' && <>Champ invalide</>}
      </p>
    </div>
  );
};
FormDataLayout.propTypes = {
  children: PropTypes.element.isRequired,
  fieldName: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
export default FormDataLayout;
