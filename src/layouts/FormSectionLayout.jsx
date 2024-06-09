import { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormDataLayout from './FormDataLayout';
import { formFieldsConfig } from '../formFieldsconfig';
import Field from '../components/admin/forms/Field';

/**
 * Form section dynamically generates fields based on provided configurations.
 * @param {Object} props - The properties object.
 * @param {Array<string>} props.fieldNames - The names of the fields to include in the form. [required]
 * @param {Object} props.fieldValue - The initial values for the fields.
 * @param {Function} props.register - useForm property
 * @param {Function} props.inputErrorClass
 * @param {Function} props.errors - useForm property
 * @param {Function} props.setValue - useForm property
 * @returns {JSX.Element} The JSX element for the form.
 */
const FormSectionLayout = ({
  fieldNames,
  fieldValue,
  register,
  inputErrorClass,
  errors,
  setValue,
}) => {
  /**
   * Effect to set initial values for fields if provided.
   * e.g. for update form
   */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        fieldNames.forEach((fieldName) => {
          setValue(fieldName, fieldValue[fieldName]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    // if props is set
    if (fieldValue) {
      fetchPost();
    }
  }, [fieldNames, fieldValue, setValue]);

  return (
    <>
      {fieldNames.map((fieldName, index) => {
        const field = formFieldsConfig[fieldName];
        const commonProps = {
          fieldName,
          field,
          register,
          inputErrorClass,
        };

        return (
          <FormDataLayout
            fieldName={fieldName}
            field={field}
            errors={errors}
            key={index}
          >
            <Field {...commonProps} />
          </FormDataLayout>
        );
      })}
    </>
  );
};
FormSectionLayout.propTypes = {
  fieldNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldValue: PropTypes.object,
  register: PropTypes.func.isRequired,
  inputErrorClass: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};
export default FormSectionLayout;
