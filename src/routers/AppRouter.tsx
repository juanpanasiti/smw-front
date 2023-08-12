import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { Loader} from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import { loadStoredToken } from '../store/slices/auth';
import { AdminRoles} from '../helpers/roleHelpers';
import { UsersPage } from '../pages/UsersPage';

interface Permissions {
  userRoutes: boolean;
}
const defaultPersmissions: Permissions = {
  userRoutes: false,
};

export const AppRouter = () => {
  const { isLoading, token, currentUser } = useAppSelector((state) => state.authState);
  const [permissions, setPermissions] = useState<Permissions>(defaultPersmissions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(loadStoredToken());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setPermissions({
        userRoutes: [...AdminRoles].includes(currentUser.role),
      })
    }
  }, [currentUser])

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route
          path='auth/*'
          element={
            <PublicRoute>
              <Routes>
                <Route path='/signin' element={<LoginPage />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path='/*'
          element={
            <PrivateRoute>
              <Routes>
                <Route path='/' element={<HomePage />} />
                {permissions.userRoutes && <Route path='/users' element={<UsersPage />} />}
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};