import { routes } from 'containers/App/constants';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from 'utils/isAuthenticated';

type ProtectedRouteProps = {
  component: ReactNode;
};

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ component }) => {
  const isAuth = isAuthenticated();

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
