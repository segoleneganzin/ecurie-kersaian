//****************************************************************************
//For admin's logged in
//****************************************************************************
import { useState } from 'react';
import ForgotPassword from './ForgotPassword';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.webp';

import SignInForm from '../../components/admin/SignInForm';

/**
 * React component for the administrator login module.
 *
 * @component
 * @returns {JSX.Element}
 */
const SignInModule = () => {
  // Status to manage display of ForgotPassword component
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div className='font-inconsolata min-h-screen bg-principal-color '>
      <header className='flex flex-col gap-4 items-center justify-between pb-12 lg:pt-12 lg:flex-row lg:pr-12 font-inconsolata'>
        <div className='flex flex-col justify-center items-center pb-6 lg:flex-row lg:gap-20 lg:pb-0'>
          <img
            src={logo}
            alt='Logo du site'
            className='w-64 lg:ml-12'
            width={256}
            height={188}
          />
          <h1 className='text-xl text-white tracking-widest text-center lg:text-left lg:text-3xl w-fit'>
            Connexion à la page d&apos;administration
          </h1>
        </div>
      </header>
      <main className='min-h-dvh text-principal-color overflow-x-hidden font-inconsolata 2xl:max-w-screen-xl 2xl:m-auto'>
        {forgotPassword ? (
          // ForgotPassword component displayed if forgotPassword status is true
          <ForgotPassword setForgotPassword={setForgotPassword} />
        ) : (
          <>
            <SignInForm />
            <div className='flex flex-col gap-4 mt-4 items-center'>
              <a
                onClick={() => setForgotPassword(true)}
                className='text-white cursor-pointer'
              >
                Mot de passe oublié
              </a>
              <Link to='/' className='text-white cursor-pointer'>
                Aller sur le site
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default SignInModule;
