import { createBrowserRouter, redirect } from 'react-router-dom';
import Auth from '../Auth';
import Home from '../Home';
import Profile from '../Profile';
import RootLayout from '../RootLayout';
import ProtectedRoutes from './ProtectedRoutes';
import AuthService from '../../services/auth';
import ProfileService from '../../services/profile';
import { AppErrorComponent } from '../../components';
import getCredentials from '../../utils/getCredentials';

const authService = new AuthService();
const profileService = new ProfileService();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <AppErrorComponent />,
    id: 'root',
    loader: () => authService.isAuthenticated(),
    children: [
      {
        element: <ProtectedRoutes />,
        loader: () => authService.isAuthenticated(),
        children: [
          { index: true, element: <Home /> },
          {
            path: 'profile',
            element: <Profile />,
            loader: async () => {
              return await profileService.getProfile();
            },
          },
        ],
      },

      {
        path: 'auth',
        element: <Auth />,
        loader: () => {
          if (authService.isAuthenticated()) {
            return redirect('/');
          }
          return null;
        },
        children: [
          {
            path: 'login',
            action: async ({ request }) => {
              const credentials = await getCredentials(request);

              await authService.login(credentials);
              return redirect('/');
            },
          },
          {
            path: 'register',
            action: async ({ request }) => {
              const credentials = await getCredentials(request);

              await authService.register(credentials);
              return redirect('/');
            },
          },
          {
            path: 'logout',
            action: () => {
              return authService.logout();
            },
          },
        ],
      },
    ],
  },
]);

export default router;
