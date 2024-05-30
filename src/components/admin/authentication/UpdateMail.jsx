//**********************************************************
//Manage user's update email
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updateEmail } from 'firebase/auth';
import { formFieldsConfig } from '../../../formFieldsconfig';
import { Form } from 'sg-form-lib';

/**
 * React component for managing user e-mail address updates.
 *
 * @component
 * @returns {JSX.Element}
 */
const UpdateMail = () => {
  // Use user context to retrieve current user information
  const { currentUser } = useContext(UserContext);
  //display message for user
  const [errorMessage, setErrorMessage] = useState('');
  const [updateOkMessage, setUpdateOkMessage] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  /**
   * Function to update the user's e-mail address.
   *
   * @function
   */
  const updateUserEmail = async (newEmail) => {
    try {
      await updateEmail(currentUser, newEmail);
      setErrorMessage('');
      setUpdateOkMessage(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Cet email est déjà utilisé');
      }
      setErrorMessage('Il y a eu un problème, veuillez réessayer');
    }
  };

  return (
    currentUser && (
      <>
        {openUpdate ? (
          updateOkMessage ? (
            // Display success message after update
            <>
              <p className='text-green-700 text-center'>
                L&apos;email a été modifié.
              </p>
            </>
          ) : (
            // Display e-mail address update form
            <>
              <Form
                fieldsConfig={formFieldsConfig}
                onSubmitFunction={updateUserEmail}
                btnText={'Valider'}
                errorMessage={errorMessage}
                title={'Modifier votre e-mail'}
                subtitle={'Votre e-mail actuel : ' + currentUser.email}
                fieldNames={['newEmail']}
              />
            </>
          )
        ) : (
          // Reauthentication required to update user data
          <>
            <ReauthenticateForm type={'email'} setOpenUpdate={setOpenUpdate} />
          </>
        )}
      </>
    )
  );
};

UpdateMail.propTypes = {
  setUpdateEmailOpen: PropTypes.func,
};

export default UpdateMail;
