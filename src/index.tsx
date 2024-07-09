import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import Auth from './routes/Auth';
import ProtectedRoute from './shared/protected-routes';
import AppNav from './components/AppNav';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: 'login',
    element: <Auth />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <div className={'d-flex flex-column'}>
      <AppNav />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
