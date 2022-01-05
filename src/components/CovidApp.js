// ===== Components =====
import React from "react";
import axios from "axios";
import stateCodes from "../Static/stateCodes";
import months from "../Static/months";
import Overview from "./Overview";
import MapArea from "./MapArea";
import Charts from "./Charts";
import Barchart from "./Barchart";
import DisplayTable from "./DisplayTable";
import Footer from "./Footer";
// ===== Styles =====
import colors from "../Static/colors";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/CovidApp";
import "../styles/_DarkModeButton.css";
import { formatDistance } from "date-fns";
import {
	faBell,
	faBellSlash,
	faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// ===== lottie =====
import * as animationData from "../assets/lottie-loading.json";
import Lottie from "react-lottie";

//Animation-loader config for lottie
const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData.default,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

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
		this.setState({ isLoading: !this.state.isLoading });
		const countryData = axios.get("https://data.covid19india.org/data.json");
		const districtLevel = axios.get(
			"https://data.covid19india.org/v2/state_district_wise.json"
		);
		const stateChanges = axios.get(
			"https://data.covid19india.org/states_daily.json"
		);
		const updates = axios.get(
			"https://data.covid19india.org/updatelog/log.json"
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

	//formatting data -> restructuring data for HeatMap
	formatData(data) {
		const formatData = data.map(singleData => {
			return {
				id: this.findStateId(singleData.state), // state codes gujarat -> GJ which is used in geographies
				state: singleData.state.replace(" and ", " & "),
				value: singleData.confirmed, //this data will be used in geopgraphy (onMouseEnter -> tooltip)
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
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 2000);
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
		} catch (e) { }
	}

	render() {
		const { classes, setDarkMode, isDarkMode } = this.props; //material UI
		const {
			mapData,
			data,
			districtLevel,
			expanded,
			updates,
			isLoading,
		} = this.state;

		if (isLoading) {
			return (
				<div className={classes.loadingIcon}>
					<Lottie options={defaultOptions} height={600} width={500} />
				</div>
			);
		}

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
		} catch (e) { }

		return (
			<>
				<div className={classes.header}>
					<h1 className={classes.heading}>
						<span>Covid-19</span>
						India Today
					</h1>
					<div>
						<FontAwesomeIcon
							icon={faSyncAlt}
							className={classes.button}
							onClick={this.fetchData}
						/>
					</div>
					<div className={classes.lastUpdatedTime}>
						Last Updated:{" "}
						{this.formatDate(this.state.todayData.lastupdatedtime)}
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
				<div>
					<Overview
						isDarkMode={isDarkMode}
						data={this.state.todayData}
						loadingStatus={this.loadingStatus}
					/>
				</div>
				<div className={classes.content}>
					<div className={classes.contentArea}>
						<div className={classes.mapArea}>
							<MapArea data={data} mapData={mapData} isDarkMode={isDarkMode} />
						</div>
					</div>
					<div className={classes.chartArea}>
						<div className={classes.chartRes}>
							<Charts data={this.state.casesTimeline} />
						</div>
						<div className={classes.tinyChartArea}>
							<div className={classes.tinyChart}>
								<div
									className={classes.tinych}
									style={{ background: "rgba(249, 52, 94,.1)" }}>
									<h3 style={{ color: colors.red }}>confirmed</h3>
									<Barchart
										data={this.state.casesTimeline}
										isLoading={this.state.isLoading}
										dataKey='totalconfirmed'
										stroke={colors.red}
									/>
								</div>
							</div>
							<div className={classes.tinyChart}>
								<div
									className={classes.tinych}
									style={{ background: "rgba(250, 100, 0,.1)" }}>
									<h3 style={{ color: colors.orange }}>active</h3>
									<Barchart
										data={this.state.casesTimeline}
										isLoading={this.state.isLoading}
										dataKey='totalactive'
										stroke={colors.orange}
									/>
								</div>
							</div>
							<div className={classes.tinyChart}>
								<div
									className={classes.tinych}
									style={{ background: "rgba(28, 177, 66,.1)" }}>
									<h3 style={{ color: colors.green }}>Recovered</h3>
									<Barchart
										data={this.state.casesTimeline}
										isLoading={this.state.isLoading}
										dataKey='totalrecovered'
										stroke={colors.green}
									/>
								</div>
							</div>
							<div className={classes.tinyChart}>
								<div
									className={classes.tinych}
									style={{ background: "rgba(98, 54, 255,.1)" }}>
									<h3 style={{ color: colors.purple }}>Deaths</h3>
									<Barchart
										data={this.state.casesTimeline}
										isLoading={this.state.isLoading}
										dataKey='totaldeaths'
										stroke={colors.purple}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={classes.tableContainer}>
						<h2 className={classes.tableHeading}>
							State/UT Wise Data (Sortable){" "}
						</h2>
						<DisplayTable
							tableData={data}
							districtLevel={districtLevel}
							isDarkMode={isDarkMode}
						/>
					</div>
				</div>
				<Footer />
			</>
		);
	}
}

export default withStyles(styles)(CovidApp);
