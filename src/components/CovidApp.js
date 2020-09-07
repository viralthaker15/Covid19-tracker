import React from "react";
import axios from "axios";
import stateCodes from "../Static/stateCodes";
import months from "../Static/months";
// ===== Styles =====
import { withStyles } from "@material-ui/core";
import styles from "../styles/CovidApp";
import { formatDistance } from "date-fns";
import {
	faBell,
	faBellSlash,
	faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
		this.formatData = this.formatData.bind(this);
		this.findStateId = this.findStateId.bind(this);
		this.getMapData = this.getMapData.bind(this); //handleformat
		this.handleNotification = this.handleNotification.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
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
	}

	//toggle
	handleNotification() {
		this.setState({ expanded: !this.state.expanded });
	}

	formatDate(date) {
		try {
			const day = date.slice(0, 2);
			const month = date.slice(3, 5);
			const time = date.slice(11);
			return `${day} ${months[month]}, ${time.slice(0, 5)} IST`;
		} catch (e) {}
	}

	render() {
		const { classes, setDarkMode, isDarkMode } = this.props; //material UI
		const { mapData, data, districtLevel, expanded, updates } = this.state;

		let showUpdates;

		try {
			//last 5 latest updates

			showUpdates = updates
				.slice(-5)
				.reverse()
				.map(({ update, timestamp }, i) => {
					update = update.replace("\n", "<br/>");
					return (
						<div className={classes.updateBox} key={i}>
							<h5 className={classes.updateHeading}>
								{`${formatDistance(
									new Date(timestamp * 1000),
									new Date()
								)} ago`}
							</h5>
							<h4
								className={classes.updateText}
								dangerouslySetInnerHTML={
									//to inject the updates directly to the dom and notifying React
									//we used dangerouslySetInnerHTML
									{
										__html: update,
									}
								}></h4>
						</div>
					);
				});
		} catch (e) {}

		return (
			<div>
				<div className={classes.header}>
					<h1 className={classes.heading}>
						<span>Covid-19</span>
						India Today
					</h1>
				</div>
				<div>
					<FontAwesomeIcon
						icon={faSyncAlt}
						className={classes.button}
						onClick={this.fetchData}
					/>
				</div>
				<div className={classes.lastUpdatedTime}>
					Last Updated: {this.formatDate(this.state.todayData.lastupdatedtime)}
				</div>
				<div className={classes.updates}>
					<div className={classes.notification}>
						{expanded ? (
							<FontAwesomeIcon
								icon={faBellSlash}
								onClick={this.handleNotification}
							/>
						) : (
							<div className={classes.notificationBell}>
								<FontAwesomeIcon
									icon={faBell}
									onClick={this.handleNotification}
								/>
							</div>
						)}
					</div>
					{expanded && <div className={classes.update}>{showUpdates}</div>}
				</div>
				<div className='darkModeButton'>
					<label className='switch'>
						<input
							type='checkbox'
							onChange={setDarkMode}
							checked={isDarkMode}
						/>
						<span className='slider round'></span>
					</label>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(CovidApp);
