// ===== components =====
import React from "react";
import CovidApp from "./components/CovidApp";
import Essentials from "./components/Essentials";
import Staysafe from "./components/Stay-safe";
import Symptoms from "./components/Symptoms";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

class App extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' component={CovidApp} />
						<Route exact path='/symptoms' component={Symptoms} />
						<Route exact path='/stay-safe' component={Staysafe} />
						<Route exact path='/essentials' component={Essentials} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
