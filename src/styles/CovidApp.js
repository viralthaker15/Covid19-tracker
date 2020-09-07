import colors from "../Static/colors";
import sizes from "../Static/sizes";

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

	update: {
		fontSize: "1.5rem",
		display: "block",
		position: "absolute",
		left: "-25rem",
		backgroundColor: ({ isDarkMode }) =>
			isDarkMode ? colors.darkPurple : "rgba(255,255,255,.95)",
		borderRadius: "2rem",
		boxShadow: "0 1rem 2rem rgba(0,0,0,.15)",
		padding: "3rem",
		zIndex: "1",
		transition: "all .5s",

		[sizes.down("sm")]: {
			left: "-18rem",
			padding: "1.5rem",
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

	button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		border: "none",
		backgroundColor: colors.purple,
		padding: "1.5rem 3rem",
		color: "#fff",
		borderRadius: "10rem",
		fontFamily: "inherit",
		fontSize: "1.6rem",
		marginLeft: "2rem",
		transition: "all .4s",
		boxShadow: "0 .5rem 1rem rgba(0,0,0,.2)",
		position: "relative",

		[sizes.down("md")]: {
			fontSize: "1.5rem",
			borderRadius: "100px",
			marginLeft: 0,
			padding: "1rem",
		},

		[sizes.down("xs")]: {
			fontSize: "1rem",
		},

		"&:hover": {
			backgroundColor: colors.darkPurple,
			boxShadow: "0 .25rem .5rem rgba(0,0,0,.2)",
			outline: "none",
			border: "none",

			"&::before": {
				transform: "scaleX(1.4) scaleY(1.6)",
				opacity: 0,
			},
		},

		"&:focus": {
			border: "none",
			outline: "none",
		},

		"&:hover svg": {
			animationName: "$rotation",
			animationDuration: "1s",
			animationTimingFunction: "linear",
			animationIterationCount: "infinite",
		},

		"&::before": {
			content: '""',
			position: "absolute",
			display: "inline-block",
			backgroundColor: colors.purple,
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			borderRadius: "10rem",
			transition: "all .4s",
			zIndex: -1,
		},
	},

	// Last updated field
	lastUpdatedTime: {
		marginLeft: "1.5rem",
		fontSize: "1.5rem",

		[sizes.down("sm")]: {
			display: "none",
		},
	},
};