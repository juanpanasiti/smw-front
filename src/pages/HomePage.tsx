import { useAppSelector } from "../hooks/reduxHooks";

export const HomePage = () => {
	const creditCards = useAppSelector(state => state.creditCardsState)
	return (
		<div>
			<h1>Home Page</h1>
			<hr />
			<pre>
				{JSON.stringify(creditCards, null, 3)}
			</pre>
		</div>
	);
};
