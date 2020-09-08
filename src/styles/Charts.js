import sizes from "../Static/sizes";

export default {
	charts: {
		backgroundColor: "rgba(129, 124, 155, 0.08)",
		width: "50%",
		height: "35rem",
		marginTop: "5rem",

		[sizes.down("md")]: {
			marginTop: "2.5rem",
			width: "100%",
			height: "30rem",
		},
		[sizes.down("xs")]: {
			marginTop: "rem",
			height: "rem",
		},
	},

	barcharts: {
		backgroundColor: "rgba(129, 124, 155, 0.08)",
		marginTop: "5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
};
