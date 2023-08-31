import { useEffect, useState } from "react";
import 'chart.js/auto';
import { Chart, ChartProps } from 'react-chartjs-2';
import { useGroupedPeriods } from "../hooks/useGroupedPeriods";
import { PeriodDataSet } from "../types/payments";
import { ContextProxy } from "chart.js/helpers";


export const HomePage = () => {
	const { periodsDataSet } = useGroupedPeriods()

	useEffect

	const [chartData, setChartData] = useState({
		labels: periodsDataSet.map(period => period.name),
		datasets: [
			getDataSet(periodsDataSet)
		]
	});

	useEffect(() => {
		setChartData({
			labels: periodsDataSet.map(period => period.name),
			datasets: [
				getDataSet(periodsDataSet),
			]
		})
	}, [periodsDataSet])



	return (
		<div>
			<h1>Home Page</h1>
			<hr />
			<div style={{height: '300px'}}>
			<Chart type='line' data={chartData} />
			</div>
		</div>
	);
};

const getDataSet = (periodsDataSet: PeriodDataSet[]) => {
	return {
		label: 'Payments',
		data: periodsDataSet.map(period => period.totalAmount),
		backgroundColor: (context:ContextProxy) => context.raw > 250000 ? 'red' : 'green',
		borderColor: 'black',
		borderWidth: 1,
	}
}