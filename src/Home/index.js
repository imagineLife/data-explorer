import React from 'react';
import '../index.css'
import BarChart from '../BarChart'
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
	let [parsedData, setParsedData] = React.useState(null)

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

	React.useEffect(() => {
		if(fileData && xVal && yVal){
			let justBarData = fileData.map(d => {
				return {
					x: d[xVal],
					y: d[yVal]
				}
			})

			setParsedData(justBarData)
		}
	}, [fileData, xVal, yVal])
	

	if(!questionText || !xVal || yVal == null || xType == null || parsedData == null){
	  return(<p>Loading file data...</p>)
	}
	
	let axisObj = {
		x: {
			key: xVal,
			type: xType
		},
		y: {
			key: yVal,
			type: yType
		}
	}

	console.log('parsedData')
	console.log(parsedData)
	
	return(
	  <React.Fragment>
	    <h2>Data Explorer</h2>
	    <p>xValue: {questionText[xVal]} </p>
	    <p>yValue: {questionText[yVal]} </p>
	    <BarChart
	    	axis={axisObj} 
	    	data={parsedData} 
	    	w={'95%'} 
	    	h={500}
	    />
	  </React.Fragment>
	)
			
}

export default Home