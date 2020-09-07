import React from "react";
import { withStyles } from "@material-ui/core";
import styles from "../styles/DisplayPanels";

const DisplayPanels = props => {
	const { title, count, dataChange, classes } = props;
	return (
		<div className={classes.panel}>
			<h3 className={classes.heading}>{title}</h3>
			<h3 className={classes.count}>{count}</h3>
			<p className={classes.dataChange}>
				{dataChange > 0 ? "+" : ""}
				{dataChange}
			</p>
		</div>
	);
};

export default withStyles(styles)(DisplayPanels);
