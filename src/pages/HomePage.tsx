import { useAppSelector } from "../hooks/reduxHooks";


export const HomePage = () => {
	// const auth = useAppSelector(state => state.authState)
	// const creditCards = useAppSelector(state => state.creditCardsState)
	const expenses = useAppSelector(state => state.expensesState)
	// const payments = useAppSelector(state => state.paymentsState)
	return (
		<div>
			<h1>Home Page</h1>
			<hr />
			{/* <pre style={{color: 'black'}}>
				{JSON.stringify(payments, null, 3)}
			</pre> */}
			<pre style={{color: 'green'}}>
				{JSON.stringify(expenses, null, 3)}
			</pre>
			{/* <pre style={{color:'red'}}>
				{JSON.stringify(auth, null, 3)}
			</pre>
			<pre style={{color: 'blue'}}>
				{JSON.stringify(creditCards, null, 3)}
			</pre> */}
		</div>
	);
};
