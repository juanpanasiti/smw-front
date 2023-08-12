// import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

// import { PlatformContext } from '../context/platform-context/PlatformContext';
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';
// import { currentUserInfo } from '../api/platformApi';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { useEffect } from 'react';
import { getUserData } from '../store/slices/auth';
import { getCCExpenses, getCreditCardList } from '../store/slices/credit_cards';
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
		creditCards.map( cc => {
			if (cc.status === Status.notLoaded) {
				dispatch(getCCExpenses(cc))
			}
		})
	}, [creditCards])


	if (!token) {
		return <Navigate to='/auth/signin' />;
	}

	return (
		<>
			<NavBar />

			<Container>
				<SideBar />
				{children}
			</Container>
		</>
	);
};

const Container = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
`;