import { routes } from 'containers/App/constants';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from 'services/auth';

type ProtectedRouteProps = {
  component: ReactNode;
};

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ component }) => {
  const authService = new AuthService();
  const isAuth = authService.isAuthenticated();

  return (
    <>
      {isAuth ? (
        component
      ) : (
        <Navigate to={routes.auth.auth} />
      )}
    </>
  );
};

export default ProtectedRoute;
