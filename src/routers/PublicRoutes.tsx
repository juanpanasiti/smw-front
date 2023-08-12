import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/reduxHooks';

interface Props {
    children: JSX.Element;
}

export const PublicRoute = ({ children }: Props) => {
    const token = useAppSelector((state) => state.authState.token)

    return !token ? children : <Navigate to='/' />;
};