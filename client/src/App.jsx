import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './social/pages/HomePage';
import { ProfilePage } from './social/pages/ProfilePage';
import { LoginPage } from './auth/pages/LoginPage';
import { RegisterPage } from './auth/pages/RegisterPage';
import { Layout } from './ui/Layout';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

export const App = () => {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <HomePage></HomePage>,
        },
        {
          path: '/profile/:id',
          element: <ProfilePage></ProfilePage>,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginPage></LoginPage>,
    },
    {
      path: '/register',
      element: <RegisterPage></RegisterPage>,
    },
  ]);

  return <RouterProvider router={router} />;
};
