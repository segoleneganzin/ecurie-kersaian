import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { formFieldsConfig } from '../../../formFieldsconfig';
import { Form } from 'sg-form-lib';

const SignInForm = () => {
  const { signIn } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleForm = (email, password) => {
    try {
      signIn(email, password, setErrorMessage);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='sm:w-96 m-auto'>
      <Form
        fieldsConfig={formFieldsConfig}
        onSubmitFunction={handleForm}
        btnText={'Connexion'}
        errorMessage={errorMessage}
        title={'Connexion'}
        fieldNames={['email', 'password']}
      />
    </div>
  );
};

export default SignInForm;
