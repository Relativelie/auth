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
import { paths, routes } from './constants';

const authService = new AuthService();
const profileService = new ProfileService();

const router = createBrowserRouter([
  {
    path: paths.home,
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
            path: paths.profile,
            element: <Profile />,
            loader: async () => {
              return await profileService.getProfile();
            },
          },
        ],
      },

      {
        path: paths.auth.auth,
        element: <Auth />,
        loader: () => {
          if (authService.isAuthenticated()) {
            return redirect(paths.home);
          }
          return null;
        },
        children: [
          {
            path: paths.auth.login,
            action: async ({ request }) => {
              const credentials = await getCredentials(request);

              await authService.login(credentials);
              return redirect(routes.home);
            },
          },
          {
            path: paths.auth.register,
            action: async ({ request }) => {
              const credentials = await getCredentials(request);

              await authService.register(credentials);
              return redirect(routes.home);
            },
          },
          {
            path: paths.auth.logout,
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
