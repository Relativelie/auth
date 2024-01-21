import { createBrowserRouter, redirect } from 'react-router-dom';
import Auth from '../Auth';
import Home from '../Home';
import RootLayout from '../RootLayout';
import AuthService from '../../services/auth';
import ProfileService from '../../services/profile';
import { AppErrorComponent } from '../../components';
import { paths, routes } from './constants';
import ProtectedRoute from '../ProtectedRoute';
import { isAuthenticated } from 'utils/isAuthenticated';

const authService = new AuthService();
const profileService = new ProfileService();

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <RootLayout />,
    errorElement: <AppErrorComponent />,
    id: 'root',
    children: [
      // Protected routes
      {
        index: true,
        element: <ProtectedRoute component={<Home />} />,
      },
      {
        path: paths.profile,
        lazy: async () => {
          const Page = (await import('../Profile')).default;
          return {
            element: <ProtectedRoute component={<Page />} />,
          };
        },
        loader: () => {
          return profileService.getProfile();
        },
      },

      // Public routes
      {
        path: paths.auth.auth,
        element: <Auth />,
        loader: () => {
          if (isAuthenticated()) {
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
      {
        path: routes.notFound,
        loader: () => {
          return redirect(paths.home);
        },
      },
    ],
  },
]);

async function getCredentials(request: Request) {
  const formData = await request.formData();
  return JSON.parse(formData.get('credentials')?.toString() || '');
}

export default router;
