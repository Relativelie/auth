import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../Navigation';
import { LoaderSpinner } from 'components/LoaderSpinner';

const RootLayout = () => {
  const { state } = useNavigation();

  return (
    <>
      {state === 'loading' && <LoaderSpinner />}

      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
