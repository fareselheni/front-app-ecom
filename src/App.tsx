import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ProductList from './pages/Product/ProductList';
import Loader from './common/Loader';
import routes from './routes';
import SignIn from './pages/Authentication/SignIn';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton } from './components/Toast';
export const token = localStorage.getItem('token');

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  // Initialize a state variable to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  // Helper function to update the isAuthenticated state
  const checkAuthentication = () => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  };

  useEffect(() => {
    // Check for authentication status when the component mounts
    checkAuthentication();
  }, [isAuthenticated]);

  // Listen for changes to localStorage (e.g., when the user logs in or out)
  window.addEventListener('storage', checkAuthentication);

  return loading ? (
    <Loader />
  ) : (
    <>
      {' '}
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />{' '}
      <Routes>
        {' '}
        <Route element={<DefaultLayout />}>
          <Route index element={<ProductList />} />{' '}
          {routes.map(({ path, component: Component, isAuthentificate }) => (
            <Route
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  {' '}
                  {isAuthentificate === true ? (
                    isAuthenticated ? (
                      <Component />
                    ) : (
                      <SignIn />
                    )
                  ) : (
                    <Component />
                  )}{' '}
                </Suspense>
              }
            />
          ))}
          {' '}
        </Route>
        {' '}
      </Routes>
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.TOP_RIGHT}
      />
         {' '}
    </>
  );
}

export default App;