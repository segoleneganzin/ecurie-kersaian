/* eslint-disable react/no-unescaped-entities */
import { useState, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import UpdateMail from './UpdateMail';
import UpdatePassword from './UpdatePassword';

const UpdateLog = () => {
  const updatePasswordRef = useRef();
  const updateMailRef = useRef();
  const [updateEmailOpen, setUpdateEmailOpen] = useState(false);
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);
  // ************** CLASSNAMES
  const buttonClassName =
    'm-auto w-fit rounded-md px-4 py-2 text-white shadow-sm transition ease-in-out duration-150 tracking-wide';

  const toggleUpdateEmail = () => {
    setUpdateEmailOpen(!updateEmailOpen);
    updatePasswordOpen && setUpdatePasswordOpen(false);
  };
  const toggleUpdatePassword = () => {
    setUpdatePasswordOpen(!updatePasswordOpen);
    updateEmailOpen && setUpdateEmailOpen(false);
  };

  const signOutUser = () => {
    signOut(auth);
  };

  return (
    <div className='flex flex-col gap-6 mt-8'>
      <button
        onClick={toggleUpdateEmail}
        ref={updateMailRef}
        className={
          buttonClassName + ' bg-principal-color hover:bg-secondary-color'
        }
      >
        Modifier votre adresse email
      </button>
      {updateEmailOpen && <UpdateMail />}
      <button
        onClick={toggleUpdatePassword}
        ref={updatePasswordRef}
        className={
          buttonClassName + ' bg-principal-color hover:bg-secondary-color'
        }
      >
        Modifier votre mot de passe
      </button>
      {updatePasswordOpen && <UpdatePassword />}
      <button
        onClick={signOutUser}
        ref={updatePasswordRef}
        className={buttonClassName + ' bg-red-800 hover:bg-red-600'}
      >
        Déconnexion
      </button>
    </div>
  );
};
export default UpdateLog;
