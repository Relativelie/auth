import { Form, NavLink, useLoaderData } from 'react-router-dom';
import classes from './index.module.css';
import { AppOutlinedButton } from '../../components';

export const MainNavigation = () => {
  const isAuth = useLoaderData() as boolean;

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
                <NavLink to='/profile' className={({ isActive }) => getClassName(isActive)}>
                  Profile
                </NavLink>
              </li>

              <li>
                <Form action='/auth/logout' method='post'>
                  <AppOutlinedButton title='Logout' />
                </Form>
              </li>
            </>
          )}
          {!isAuth && (
            <li>
              <NavLink to='/auth' className={({ isActive }) => getClassName(isActive)}>
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
