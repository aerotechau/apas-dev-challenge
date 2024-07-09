import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const Auth = (): React.ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const isAuthenticated = !!localStorage.getItem('token');

  // This use effect runs once when the component is loaded and everytime when isAuthenticated changes.
  useEffect(() => {
    if (isAuthenticated) {
      // If the localStorage has a token then we re-route the user to the home page.
      window.location.replace('/');
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to={'/'} replace />;
  }

  // Registration and login handler. The user is able to Registering or login based on the
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, username, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, username, password);
      }

      // Response is stored in the localStorage for easy access.
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);

      // Reset form
      setUsername('');
      setPassword('');

      // Redirect to home page
      window.location.replace('/');
    } catch (error) {
      console.error('Authentication error', error);
    }
  };

  const setUsernameHandler = (e: React.FormEvent) => {
    const element = e.target as HTMLInputElement;
    setUsername(element.value);
  };

  const setPasswordHandler = (e: React.FormEvent) => {
    const element = e.target as HTMLInputElement;
    setPassword(element.value);
  };

  return (
    <div className={'container-sm-fluid container-lg'}>
      <div className={'row'}>
        <div className={'col-sm-10 col-md-6 mx-auto'}>
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>
          <form onSubmit={handleSubmit}>
            <div className={'mb-3'}>
              <label htmlFor={'username'} className={'form-label'}>{'Email address'}</label>
              <input type={'email'} value={username} onChange={setUsernameHandler} className={'form-control'} id={'username'} aria-describedby={'emailHelp'} />
              <div id={'emailHelp'} className={'form-text'}>{'Enter your email address.'}</div>
            </div>
            <div className={'mb-3'}>
              <label htmlFor={'password'} className={'form-label'}>{'Password'}</label>
              <input type={'password'} value={password} onChange={setPasswordHandler} className={'form-control'} id={'password'} />
            </div>
            <div className={'d-flex justify-content-between'}>
              <button type={'submit'} className={'btn btn-primary'}>{isRegistering ? 'Register' : 'Login'}</button>
              <button type={'button'} onClick={() => setIsRegistering(!isRegistering)} className={'btn btn-secondary'}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
