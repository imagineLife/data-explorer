import React from 'react';
import { makeScaleType } from '../helpers' 
import '../index.css'

/*
	Data Assumptions:
	1. the data comes in as an array
	2. the array has a bunch of objects with more assumptions...
		2a. the object keys are the same between objects
		2b. the object keys are mapped to another file, storing the text-content of the keys
*/
const Home = () => {
	let [fileData, setFiledata] = React.useState(null)
	let [questionText, setQuestionText] = React.useState(null)
	let [xVal, setXVal] = React.useState(null)
	let [yVal, setYVal] = React.useState(null)
	let [xType, setXType] = React.useState(null)
	let [yType, setYType] = React.useState(null)

	React.useEffect(() => {
		fetch('../data/dvs.json').then(data => {
			data.json().then(parsed => {
				setFiledata(parsed)
				return
			})
		})
	}, [])

	React.useEffect(() => {
		if(fileData){
			fetch('../data/questionText.json').then(qt => {
				qt.json().then(qtParsed => {
					let questions = qtParsed[0]
					setQuestionText(questions)
					return
				}).then(() => {
					console.log('Here?!')
				});
			})
		}
	}, [fileData])


	React.useEffect(() => {
		if(questionText && !xVal){
			setYVal("q42")
			setYType(typeof(fileData[0]["q42"]))
			setXVal("q9")
			setXType(typeof(fileData[0]["q9"]))
		}
	}, [questionText])
	

	if(!questionText || !xVal || !yVal || !xType){
	  return(<p>No File Data</p>)
	}

	let xScale = makeScaleType(xType, fileData, xVal)
	let yScale = makeScaleType(yType, fileData, yVal)
	
	return(
	  <React.Fragment>
	    <h2>Data Explorer</h2>
	    <p>xValue: {questionText[xVal]} </p>
	    <p>yValue: {questionText[yVal]} </p>
	    <div id="chartDiv" style={{height: '500px'}}/>
	  </React.Fragment>
	)
			
}

export default Home