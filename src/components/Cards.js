import { withStyles } from "@material-ui/styles";
import React from "react";
import styles from "../styles/Cards";

const Cards = ({ title, src, classes }) => {
	return (
		<div className={classes.card}>
			<h3 className={classes.cardTitle}>{title}</h3>
			<img src={src} alt={title} className={classes.cardImage} />
		</div>
	);
};

export default withStyles(styles)(Cards);
