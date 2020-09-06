import React from "react";
import axios from "axios";
import stateCodes from "../Static/stateCodes";
import months from "../Static/months";
// ===== Styles =====
import { withStyles } from "@material-ui/core";
import styles from "../styles/CovidApp";

class CovidApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			todayData: {},
			isLoading: false,
			mapData: [],
		};

		this.fetchData = this.fetchData.bind(this);
		this.findStateId = this.findStateId.bind(this);
		this.getMapData = this.getMapData(this);
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
				const data = countryData.statewise.slice(1, -1); //last two data are irrelevent and gives 0 data

				this.setState(
					{
						data: data,
						todayData: todayData,
						casesTimeline: casesTimeline,
						districtLevel: districtLevel,
						updates: updates,
						expanded: false,
					},
					this.getMapData
				);
			})
		);
	}

	//formatting data
	formatData(data) {
		const formatData = data.map(singleData => {
			return {
				id: this.findStateId(singleData.state), // state codes gujarat -> GJ
				state: singleData.state.replace(" and ", " & "),
				value: singleData.confirmed,
			};
		});

		return formatData;
	}

	findStateId(state) {
		for (const [key, value] of Object.entries(stateCodes))
			if (key === state) return value;
	}

	getMapData() {
		const newData = this.formatData(this.state.data);

		this.setState({
			mapData: newData,
		});

		//this.state.mapData = newData;
	}

	formatDate(date) {
		try {
			const day = date.slice(0, 2);
			const month = date.slice(3, 5);
			const time = date.slice(11);
			return `${day} ${months[month]}, ${time.slice(0, 5)} IST`;
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		const { mapData, data, districtLevel, expanded, updates } = this.state;

		return (
			<div className={this.props.classes.header}>
				<h1>CovidApp</h1>
			</div>
		);
	}
}

export default withStyles(styles)(CovidApp);
