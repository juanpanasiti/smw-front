import { useEffect, useState } from "react";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useGroupedPeriods } from "../hooks/useGroupedPeriods";
import { PeriodDataSet } from "../types/payments";
import { ChartData, ChartDataset, ScriptableContext } from "chart.js/auto";
// import { getColorForChart } from "../helpers/chart.helpers";

type ChartLabel = string | ((context: ScriptableContext<"line">) => string)

// const LIMIT = 450000;
export const HomePage = () => {
	const { periodsDataSet } = useGroupedPeriods()

	const [chartData, setChartData] = useState<ChartData<"line", number[], ChartLabel >>({
		labels: periodsDataSet.map(period => period.name),
		datasets: [
			// getLimit(periodsDataSet.length),
			getDataSet(periodsDataSet),
		]
	});

	useEffect(() => {
		setChartData({
			labels: periodsDataSet.map(period => period.name),
			datasets: [
				// getLimit(periodsDataSet.length),
				getDataSet(periodsDataSet),
			],
		})
	}, [periodsDataSet])

	return (
		<div>
			<h1>Home Page</h1>
			<hr />
			<div style={{height: '300px'}}>
			<Line data={chartData} />
			</div>
		</div>
	);
};

// const getLimit = (size: number): ChartDataset<"line", number[]> => {
// 	return {
// 		label: 'Limit',
// 		data: new Array<number>(size).fill(LIMIT),
// 		backgroundColor: 'rgba(0, 0, 0, 0)',
// 		borderColor: 'red',
// 		borderWidth: 1,
// 		borderDash: [1, 5],
// 		pointHitRadius: 0,
// 		pointBorderColor: 'rgba(0, 0, 0, 0)',
// 		pointBackgroundColor: 'rgba(0, 0, 0, 0)',
// 		pointBorderWidth: 0,
// 	}
// }

const getDataSet = (periodsDataSet: PeriodDataSet[]): ChartDataset<"line", number[]> => {
	return {
		label: 'Payments',
		data: periodsDataSet.map(period => period.totalAmount),
		// backgroundColor: (context: ScriptableContext<"line">):string => getColorForChart(context.raw as number, LIMIT),
		backgroundColor: '#FFC300',
		borderColor: 'rgba(0, 0, 0, 0.4)',
		borderWidth: 1,
	}
}
