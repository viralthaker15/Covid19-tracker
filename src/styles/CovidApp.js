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
};
