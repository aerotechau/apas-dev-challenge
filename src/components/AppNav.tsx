import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const AppNav = (): React.ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Runs once and check for authState and then unsubscribes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    });

    return () => unsubscribe();
  }, []);

  // Remove the token from the localStorage
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      window.location.reload(); // Reload to trigger useEffect and redirect
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  // Rerouting users to the home page.
  const loginHandler = async () => {
    window.location.assign('/');
  };

  return (
    <nav className={'navbar bg-body-tertiary'}>
      <div className={'container-fluid'}>
        <button type={'button'} className={'navbar-brand btn btn-outline'}>{'Home'}</button>
        <form className={'d-flex'} role={'search'}>
          <button onClick={isAuthenticated ? logoutHandler : loginHandler} className={'btn btn-outline-success'} type={'button'}>
            {isAuthenticated ? 'Log Out' : 'Log In'}
          </button>
        </form>
      </div>
    </nav>
  );
};

export default AppNav;
