import React from "react";
import {
	Legend,
	Line,
	LineChart,
	ResponsiveContainer, //it makes the hover transition smooth here
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import colors from "../Static/colors";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/Charts";

class Charts extends React.Component {
	render() {
		const { data, classes } = this.props;
		let result;
		try {
			const updatedData = data.slice(1).slice(-50);
			result = updatedData.map(singleData => {
				let dateData = {};
				for (let [key, value] of Object.entries(singleData)) {
					if (key === "date") dateData[key] = value;
					else if (key === "totaldeceased")
						dateData["totaldeaths"] = Number(value);
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
			<div className={classes.charts}>
				<ResponsiveContainer>
					<LineChart
						width={600}
						height={300}
						data={result}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<XAxis dataKey='date' />
						<YAxis />
						<Tooltip />
						<Legend
							wrapperStyle={{
								margin: "-3rem 1rem",
							}}
						/>
						<Line
							type='monotone'
							dataKey='totalconfirmed'
							stroke={colors.red}
							dot={false}
							activeDot={{ r: 8 }}
						/>
						<Line
							type='monotone'
							dataKey='totalactive'
							stroke={colors.orange}
							dot={false}
						/>
						<Line
							type='monotone'
							dataKey='totalrecovered'
							stroke={colors.green}
							dot={false}
						/>
						<Line
							type='monotone'
							dataKey='totaldeaths'
							stroke={colors.purple}
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default withStyles(styles)(Charts);
