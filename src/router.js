import React from "react"
import { render } from "react-dom"
import { Router, Link } from "@reach/router"
import Home from './Home'
import Dash from './Dash'
import MedaUploader from './MedaUploader'

const ThisRouter = () => {
  return(
    <Router>
      <Home path="/" />
      <Dash path="dashboard" />
      <MedaUploader path="meda" />
    </Router>
  )
} 

export default ThisRouter