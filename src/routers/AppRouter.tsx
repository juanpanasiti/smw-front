import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import styled from 'styled-components';

import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { Loader } from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { loadStoredToken } from '../store/slices/auth';
import { AdminRoles } from '../helpers/roleHelpers';
import { UsersPage } from '../pages/UsersPage';
import { CreditCardsPage } from '../pages/CreditCardsPage';
import { ExpensesPage } from '../pages/ExpensesPage';
import { PaymentsPage } from '../pages/PaymentsPage';
import { ToastMessage } from '../components/shared/ToastMessage';

interface Permissions {
	userRoutes: boolean;
}
const defaultPersmissions: Permissions = {
	userRoutes: false,
};

export const AppRouter = () => {
	const { isLoading, token, currentUser } = useAppSelector((state) => state.authState);
	const { messages } = useAppSelector(({ messagesState }) => messagesState);
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
			{/* Loader */}
			{isLoading && <Loader />}

			{/* Routes */}
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
								<Route path='/credit-cards/' element={<CreditCardsPage />} />
								<Route path='/expenses/' element={<ExpensesPage />} />
								<Route path='/payments/' element={<PaymentsPage />} />
								{permissions.userRoutes && <Route path='/users' element={<UsersPage />} />}
							</Routes>
						</PrivateRoute>
					}
				/>
			</Routes>
			{/* Messages */}
			<MsgPileContainer>

				<ToastContainer className="position-static" position='bottom-start' >
					{messages.map(msg => <ToastMessage key={msg.id} message={msg} />)}
				</ToastContainer>
			</MsgPileContainer>
		</>
	);
};

const MsgPileContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;