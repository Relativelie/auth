import { Outlet } from 'react-router-dom';
import MainNavigation from '../Navigation';

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
