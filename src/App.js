// ===== components =====
import React from "react";
import Canvas from "./components/Canvas";
import CovidApp from "./components/CovidApp";
import Essentials from "./components/Essentials";
import Staysafe from "./components/Stay-safe";
import Symptoms from "./components/Symptoms";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDarkMode: false,
		};

		this.setDarkMode = this.setDarkMode.bind(this);
	}

	setDarkMode(e) {
		this.setState({
			isDarkMode: e.target.checked,
		});
	}

	render() {
		const { isDarkMode } = this.state;
		return (
			<Canvas isDarkMode={isDarkMode}>
				<div className='root'>
					<div className='navBar'></div>
					<div className='dashBoard'>
						<BrowserRouter>
							<Switch>
								<Route
									exact
									path='/'
									render={() => (
										<CovidApp
											setDarkMode={this.setDarkMode}
											isDarkMode={isDarkMode}
										/>
									)}
								/>
								<Route
									exact
									path='/symptoms'
									render={() => <Symptoms isDarkMode={isDarkMode} />}
								/>
								<Route
									exact
									path='/stay-safe'
									render={() => <Staysafe isDarkMode={isDarkMode} />}
								/>
								<Route
									exact
									path='/essentials'
									render={() => <Essentials isDarkMode={isDarkMode} />}
								/>
							</Switch>
						</BrowserRouter>
					</div>
				</div>
			</Canvas>
		);
	}
}

export default App;
