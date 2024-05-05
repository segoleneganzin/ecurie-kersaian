//**********************************************************
//Manage user's update email
//**********************************************************
import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import ReauthenticateForm from './ReauthenticateForm';
import { updateEmail } from 'firebase/auth';
import Form from '../../components/admin/Form';

/**
 * React component for managing user e-mail address updates.
 *
 * @component
 * @returns {JSX.Element}
 */
const UpdateMail = () => {
  // Use user context to retrieve current user information
  const { currentUser } = useContext(UserContext);
  const [emailValidation, setEmailValidation] = useState('');
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
      setEmailValidation('');
      setUpdateOkMessage(true);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailValidation('Cet email est déjà utilisé');
      }
      console.log(error);
    }
  };

  return currentUser ? (
    openUpdate ? (
      updateOkMessage ? (
        // Display success message after update
        <div>
          <p className='text-green-700 text-center'>
            L&apos;email a été modifié.
          </p>
        </div>
      ) : (
        // Display e-mail address update form
        <>
          <Form
            onSubmitFunction={updateUserEmail}
            btnText={'Valider'}
            validation={emailValidation}
            title={'Modifier votre e-mail'}
            subtitle={'E-mail actuel : ' + currentUser.email}
            fieldNames={['newEmail']}
          />
        </>
      )
    ) : (
      // Reauthentication required to update user data
      <div>
        <h2 className='text-white text-xl text-center font-bold bg-red-900 rounded-t-sm mb-4'>
          Modifier votre e-mail
        </h2>
        <ReauthenticateForm setOpenUpdate={setOpenUpdate} />
      </div>
    )
  ) : (
    // If the user is not logged in, display nothing
    ''
  );
};

UpdateMail.propTypes = {
  setUpdateEmailOpen: PropTypes.func,
};

export default UpdateMail;
