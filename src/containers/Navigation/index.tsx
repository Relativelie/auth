import { Form, NavLink } from 'react-router-dom';
import { AppOutlinedButton } from '../../components';
import { routes } from '../App/constants';
import { isAuthenticated } from 'utils/isAuthenticated';

import classes from './index.module.css';

export const MainNavigation = () => {
  const isAuth = isAuthenticated();

  const getClassName = (isActive: boolean) => {
    return isActive ? classes.active : undefined;
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {isAuth && (
            <>
              <li>
                <NavLink to='/' className={({ isActive }) => getClassName(isActive)} end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={routes.profile} className={({ isActive }) => getClassName(isActive)}>
                  Profile
                </NavLink>
              </li>

              <li>
                <Form action={routes.auth.logout} method='post'>
                  <AppOutlinedButton title='Logout' />
                </Form>
              </li>
            </>
          )}
          {!isAuth && (
            <li>
              <NavLink to={routes.auth.auth} className={({ isActive }) => getClassName(isActive)}>
                Authorization
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
