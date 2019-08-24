import React from "react"
import { render } from "react-dom"
import { Router, Link } from "@reach/router"
import Home from './Home'

let Dash = () => <div>Dash</div>

const ThisRouter = () => {
  return(
    <Router>
      <Home path="/" />
      <Dash path="dashboard" />
    </Router>
  )
} 

export default ThisRouter