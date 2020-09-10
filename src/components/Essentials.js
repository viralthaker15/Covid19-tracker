import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import React from "react";
import FadeIn from "react-fade-in";
import styles from "../styles/Essentials";
import EssentialForm from "./EssentialForm";
import Placeholder from "./Placeholder";
import Footer from "./Footer";

class Essentials extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			data: {},
			currentResources: [],
			loadingStatus: null,
		};
		this.handleQuery = this.handleQuery.bind(this);
		this.handleLoading = this.handleLoading.bind(this);
		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		this.fetchResources();
	}

	async fetchResources() {
		try {
			const [response] = await Promise.all([
				axios.get("https://api.covid19india.org/resources/resources.json"),
			]);
			const hashmap = {};
			response.data.resources.forEach(singleData => {
				if (typeof hashmap[singleData["state"]] === "undefined")
					hashmap[singleData["state"]] = {};
				if (
					typeof hashmap[singleData["state"]][singleData["city"]] ===
					"undefined"
				)
					hashmap[singleData["state"]][singleData["city"]] = {};

				if (
					typeof hashmap[singleData["state"]][singleData["city"]][
						singleData["category"]
					] === "undefined"
				)
					hashmap[singleData["state"]][singleData["city"]][
						singleData["category"]
					] = [];
				if (
					Array.isArray(
						hashmap[singleData["state"]][singleData["city"]][
							singleData["category"]
						]
					)
				)
					hashmap[singleData["state"]][singleData["city"]][
						singleData["category"]
					].push(singleData);
			});
			this.setState({ data: hashmap });
		} catch (err) {}
	}

	handleQuery(query) {
		this.setState({ query: query }, this.getData);
	}

	handleLoading() {
		this.setState({ loadingStatus: "loading" });
	}

	getData() {
		let resources = [];
		for (const state of Object.keys(this.state.data)) {
			if (state.toLowerCase() === this.state.query.toLowerCase()) {
				resources.push({ ...this.state.data[state] });
			} else {
				for (const dist of Object.keys(this.state.data[state])) {
					if (dist.toLowerCase() === this.state.query.toLowerCase()) {
						resources.push({ [state]: this.state.data[state][dist] });
					}
				}
			}
		}
		this.setState({ currentResources: resources });
		setTimeout(() => this.setState({ loadingStatus: "completeLoading" }), 2000); //sync
		//currentResources -> array of objects
	}

	render() {
		const { classes } = this.props;
		const res = this.state.currentResources.map(object => {
			for (const key in object) {
				// query -> ahmedabad
				// key -> gujarat
				// object -> [{}]
				// key2 -> Delivery [Vegetables, Fruits, Groceries, Medicines, etc.]
				// object[key] -> { testinglab(array) , delivery(array) , freefood(array) }
				for (const key2 in object[key]) {
					const result = object[key][key2].map(resource => (
						<FadeIn
							key={resource.phonenumber.split(0, 5)}
							className={classes.card}>
							<div className={classes.header}>
								<h3 className={classes.cardHeading}>{resource.category}</h3>
								<a
									className={classes.cardLink}
									href={resource.contact}
									target='_blank'
									rel='noopener noreferrer'>
									<FontAwesomeIcon
										icon={faExternalLinkAlt}
										className={classes.icons}
									/>
								</a>
							</div>
							<div className={classes.content}>
								<p className={classes.text}>
									Organization: {resource.nameoftheorganisation}
								</p>
								<p className={classes.text}>Contact: {resource.phonenumber}</p>
							</div>
						</FadeIn>
					));
					return result;
				}
			}
			return null;
		});
		return (
			<div>
				<div className={classes.help}>
					<h1 className={classes.mainHeading}>
						Search for Essentials and Services
					</h1>
					<EssentialForm
						handleQuery={this.handleQuery}
						handleLoading={this.handleLoading}
					/>
					{this.state.loadingStatus === "loading" && (
						<div className={classes.container}>
							<Placeholder />
							<Placeholder />
							<Placeholder />
						</div>
					)}
					{this.state.loadingStatus === "completeLoading" && (
						<div className={classes.container}>{res}</div>
					)}
				</div>
				<Footer />
			</div>
		);
	}
}

export default withStyles(styles)(Essentials);
