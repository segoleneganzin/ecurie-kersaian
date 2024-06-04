import PropTypes from 'prop-types';

/**
 * OtherField component renders a form field based on the provided configuration.
 * input, textarea
 *
 * @param {Object} props - The properties object.
 * @param {string} props.fieldName - The name of the field.
 * @param {Object} props.field - The configuration object for the field.
 * @param {function} props.register - The register function from useForm hook.
 * @param {function} props.inputErrorClass - The function to get the error class for a given field.
 * @returns {JSX.Element} - The JSX element for the form field.
 */
const Field = ({ fieldName, field, register, inputErrorClass }) => {
  const Tag = field.tag || 'input';
  return (
    <Tag
      id={fieldName}
      name={fieldName}
      type={field.type}
      step={field.step && field.step}
      className={inputErrorClass(fieldName) + ' w-20'}
      {...register(fieldName, {
        required: field.isRequired,
        pattern: field.pattern || null, // null by default, if the information isn't set into fieldConfig
      })}
    />
  );
};

Field.propTypes = {
  fieldName: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  inputErrorClass: PropTypes.func.isRequired,
};

export default Field;
