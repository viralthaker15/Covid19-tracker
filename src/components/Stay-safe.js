import React from "react";
import { withStyles } from "@material-ui/styles";
import Cards from "./Cards.js";
import calender from "../assets/calender.svg";
import coronalogo from "../assets/coronalogo.svg";
import nogreet from "../assets/nogreet.svg";
import sanitizer from "../assets/sanitizer.svg";
import washhands from "../assets/washhands.svg";
import wearmask from "../assets/wearmask.svg";
import styles from "../styles/Staysafe";

const staySafe = props => {
	const svgIcons = [
		{ src: washhands, title: "Wash Your Hands Often" },
		{ src: wearmask, title: "Wear a Mask" },
		{ src: sanitizer, title: "Use Alcohol Based Sanitizer" },
		{ src: calender, title: "Visit Doctor Incase Of Any Symptoms" },
		{ src: nogreet, title: "Keep Distance" },
		{ src: coronalogo, title: "Stay Home Stay Safe" },
	];

	const { classes, isDarkMode } = props;

	return (
		<div>
			<div className={classes.staySafe}>
				<h1>Stay Safe</h1>
				<div className={classes.cardsBox}>
					{svgIcons.map((svg, i) => (
						<Cards
							key={i}
							src={svg.src}
							title={svg.title}
							isDarkMode={isDarkMode}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default withStyles(styles)(staySafe);
