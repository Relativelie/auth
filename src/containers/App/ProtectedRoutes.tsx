import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isAuth = useLoaderData() as boolean;

  return isAuth ? <Outlet /> : <Navigate to='/auth' replace />;
};

export default ProtectedRoutes;
