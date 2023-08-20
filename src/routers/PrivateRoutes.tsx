import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useEffect } from 'react';
import { getUserData } from '../store/slices/auth';
import { getCreditCardList } from '../store/slices/creditCards';
import { getExpenseList } from '../store/slices/expenses/thunks';
import { Status } from '../helpers/creditCardStatusHelpers';

interface Props {
	children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
	const token = useAppSelector((state) => state.authState.token);
	const creditCards = useAppSelector((state) => state.creditCardsState.creditCards);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUserData());
		dispatch(getCreditCardList())
	}, [dispatch]);

	useEffect(() => {
		creditCards.map(cc => {
			if (cc.status === Status.notLoaded) {
				dispatch(getExpenseList(cc))
			}
		})
	}, [creditCards, dispatch])


	if (!token) {
		return <Navigate to='/auth/signin' />;
	}

	return (
		<>
			<NavBar />

			<StyledContainer>
				<SideBar />
				<StyledContentContainer>
					{children}
				</StyledContentContainer>
			</StyledContainer>
		</>
	);
};

const StyledContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
`;

const StyledContentContainer = styled.div`
  padding: 1rem 1.5rem;
  width: 100%;
`;