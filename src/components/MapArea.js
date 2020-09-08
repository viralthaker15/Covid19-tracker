import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "../styles/MapArea";
import Map from "./Map";
import DisplayPanels from "./DisplayPanels";

class MapArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			confirmed: "-",
			deaths: "-",
			recovered: "-",
			active: "-",
		};

		this.currentLocation = this.currentLocation.bind(this);
	}

	currentLocation(location) {
		const stateName = location.replace(" & ", " and ");

		const [updatedData] = this.props.data.filter(
			singleData => singleData.state === stateName
		);

		try {
			this.setState({
				...updatedData,
				deltaactive:
					Number(updatedData.deltaconfirmed) -
					(Number(updatedData.deltarecovered) +
						Number(updatedData.deltadeaths)),
			});
		} catch (e) {}
	}

	render() {
		const { classes, mapData, isDarkMode } = this.props;

		const {
			confirmed,
			deaths,
			recovered,
			active,
			state,
			deltaconfirmed,
			deltadeaths,
			deltarecovered,
			deltaactive,
		} = this.state;

		return (
			<div className={classes.mainContainer}>
				<h4 className={classes.heading}>State/UT : {state}</h4>
				<p className={classes.para}>
					Hover over the states in the map to view the stats
				</p>
				<div className={classes.container}>
					<div className={classes.panelsContainer}>
						<div className={classes.singlePanel}>
							<DisplayPanels
								title='Confirmed'
								count={confirmed}
								isDarkMode={isDarkMode}
								dataChange={deltaconfirmed}
								isMiniPanel={true}
							/>
						</div>
						<div className={classes.singlePanel}>
							<DisplayPanels
								title='Active'
								count={active}
								isDarkMode={isDarkMode}
								dataChange={deltaactive}
								isMiniPanel={true}
							/>
						</div>
						<div className={classes.singlePanel}>
							<DisplayPanels
								title='Recovered'
								count={recovered}
								isDarkMode={isDarkMode}
								dataChange={deltarecovered}
								isMiniPanel={true}
							/>
						</div>
						<div className={classes.singlePanel}>
							<DisplayPanels
								title='Deaths'
								count={deaths}
								isDarkMode={isDarkMode}
								dataChange={deltadeaths}
								isMiniPanel={true}
							/>
						</div>
					</div>
					<div className={classes.mapContainer}>
						<Map mapData={mapData} currentLocation={this.currentLocation} />
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(MapArea);
