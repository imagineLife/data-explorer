import React from "react"
import ReactDOM from "react-dom"
import pngImage from './static/say-what.png'
import "./index.css";
import Router from './router'
const App = () => {
	return(<Router />)
}

ReactDOM.render(<App />, document.getElementById("app"));