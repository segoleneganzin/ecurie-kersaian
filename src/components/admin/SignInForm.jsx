import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Form from './Form';

const SignInForm = () => {
  const { signIn } = useContext(UserContext);
  const [validation, setValidation] = useState('');

  const handleForm = (email, password) => {
    try {
      signIn(email, password, setValidation);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Form
        onSubmitFunction={handleForm}
        btnText={'Connexion'}
        validation={validation}
        title={'Se connecter'}
        fieldNames={['email', 'password']}
        classnames={
          ' bg-secondary-color border-2 border-principal-color p-4 rounded-lg max-w-sm mx-auto'
        }
      />
    </div>
  );
};

export default SignInForm;
