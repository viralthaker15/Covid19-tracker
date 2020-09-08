import React from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export default class Barchart extends React.Component {
	render() {
		const { data, isLoading, dataKey, stroke } = this.props;
		let result;

		try {
			const updatedData = data.slice(1).slice(-50);
			result = updatedData.map(singleData => {
				let dateData = {};
				for (let [key, value] of Object.entries(singleData)) {
					if (key === "date") dateData[key] = value;
					if (key === "totaldeceased") dateData["totaldeaths"] = Number(value);
					else dateData[key] = Number(value);
				}
				return {
					...dateData,
					totalactive:
						dateData.totalconfirmed -
						(dateData.totalrecovered + dateData.totaldeaths),
				};
			});
		} catch (e) {}

		return (
			<div>
				<BarChart
					width={350}
					height={150}
					data={result}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<XAxis dataKey='date' />
					<YAxis />
					<Tooltip />
					<Bar dataKey={dataKey} fill={stroke} />
				</BarChart>
			</div>
		);
	}
}
