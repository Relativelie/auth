import { Navigate, Outlet, useLoaderData } from 'react-router-dom';
import { routes } from './constants';

const ProtectedRoutes = () => {
  const isAuth = useLoaderData() as boolean;

  return isAuth ? <Outlet /> : <Navigate to={routes.auth.auth} replace />;
};

export default ProtectedRoutes;
