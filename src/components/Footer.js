import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import React, { Component } from "react";
import styles from "../styles/Footer.js";

class Footer extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.footer}>
					<a
						href='https://github.com/viralthaker15/Covid19-tracker'
						target='_blank'
						rel='noopener noreferrer'
						className={classNames(classes.btn, classes.github)}>
						Contribute on Github
					</a>
					<a
						href='https://twitter.com/intent/tweet?text=Get the latest Covid-19 updates with Covid-19 India Tracker!&url=https://covidindiatracker.netlify.app/'
						target='_blank'
						rel='noopener noreferrer'
						className={classNames(classes.btn, classes.twitter)}>
						Share on Twitter
					</a>
					<a
						href='https://github.com/viralthaker15/Covid19-tracker/issues/new'
						target='_blank'
						rel='noopener noreferrer'
						className={classNames(classes.btn, classes.issue)}>
						Report an Issue
					</a>
					<a
						href='https://www.linkedin.com/in/viral-thaker-065877134/'
						target='_blank'
						rel='noopener noreferrer'
						className={classNames(classes.btn, classes.linkedin)}>
						Contact me : LinkedIn
					</a>
				</div>
				<div className={classes.Tagline}>
					<h3>Crafted with &#10084; by Viral Thaker</h3>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(Footer);
