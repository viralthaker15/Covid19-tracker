import React from "react";
import DisplayPanels from "./DisplayPanels";
import styles from "../styles/Overview";
import { withStyles } from "@material-ui/styles";

const Overview = props => {
	const { isDarkMode, classes } = props;
	const {
		active,
		confirmed,
		deaths,
		recovered,
		deltaconfirmed,
		deltadeaths,
		deltarecovered,
	} = props.data;

	const deltaActive =
		Number(deltaconfirmed) - (Number(deltadeaths) + Number(deltarecovered));

	return (
		<div className={classes.root}>
			<div className={classes.panels}>
				<div className={classes.panelContainer}>
					<DisplayPanels
						title='Confirmed'
						count={confirmed}
						isDarkMode={isDarkMode}
						dataChange={deltaconfirmed > 0 ? deltaconfirmed : "-"}
					/>
				</div>
				<div className={classes.panelContainer}>
					<DisplayPanels
						title='Active'
						count={active}
						isDarkMode={isDarkMode}
						dataChange={deltaActive}
					/>
				</div>
				<div className={classes.panelContainer}>
					<DisplayPanels
						title='Recovered'
						count={recovered}
						isDarkMode={isDarkMode}
						dataChange={deltarecovered}
					/>
				</div>
				<div className={classes.panelContainer}>
					<DisplayPanels
						title='Deaths'
						count={deaths}
						isDarkMode={isDarkMode}
						dataChange={deltadeaths}
					/>
				</div>
			</div>
		</div>
	);
};

export default withStyles(styles)(Overview);
