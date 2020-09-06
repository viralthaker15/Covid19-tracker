import React from "react";
import axios from "axios";

export default class CovidApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			todayData: {},
			isLoading: false,
			mapData: [],
			tableData: [],
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		const countryData = axios.get("https://api.covid19india.org/data.json");
		const districtLevel = axios.get(
			"https://api.covid19india.org/v2/state_district_wise.json"
		);
		const stateChanges = axios.get(
			"https://api.covid19india.org/states_daily.json"
		);
		const updates = axios.get(
			"https://api.covid19india.org/updatelog/log.json"
		);

		axios.all([countryData, districtLevel, stateChanges, updates]).then(
			axios.spread((...responses) => {
				//extracting the data
				const countryData = responses[0].data;
				const districtLevel = responses[1].data;
				const updates = responses[3].data;

				//extracting necessary data from extracted data
				const [todayData] = countryData.statewise.slice(0, 1);
				const casesTimeline = countryData.cases_time_series; //timeline summary of cases
				console.log(casesTimeline);
			})
		);
	}

	state = {};

	render() {
		return (
			<div>
				<h1>CovidApp</h1>
			</div>
		);
	}
}
