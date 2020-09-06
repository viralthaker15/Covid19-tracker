import colors from "../Static/colors";

export default {
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	heading: {
		fontWeight: "500",
		color: props =>
			props.isDarkMode ? "rgb(245, 245, 245)" : colors.darkPurple,
		display: "inline-block",
		"& span": {
			fontWeight: "900",
			color: colors.purple,
			marginRight: "1rem",
		},
	},

	// Updation & bells icon

	updates: {
		marginLeft: "auto",
		position: "relative",
	},

	updateBox: {
		marginBottom: "1.5rem",
	},

	updateHeading: {
		textTransform: "capitalize",
	},
	updateText: {
		fontWeight: "400",
	},

	notification: {
		fontSize: "3rem",
		color: ({ isDarkMode }) =>
			isDarkMode ? colors.lightPurple : colors.darkPurple,
		margin: "1rem",
		position: "relative",
		transition: "all .4s ease",

		"&:hover": {
			transform: "scale(1.15)",
			color: ({ isDarkMode }) => (isDarkMode ? "rgba(255,255,255,.8)" : "#000"),
		},
	},

	//notification bell
	notificationBell: {
		position: "relative",

		"&::before": {
			content: '""',
			position: "absolute",
			width: "1rem",
			height: "1rem",
			backgroundColor: "red",
			borderRadius: "10rem",
			top: "1rem",
			right: 0,
		},
	},
};
