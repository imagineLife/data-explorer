import React from 'react';
import '../index.css'
import Chart from '../Chart'
import { prepCountByIncomeData, prepCountByYearsData } from '../helpers'

// const prepBarData = (srcData,)

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
	let [xType, setXType] = React.useState(null)
	let [yType, setYType] = React.useState(null)
	// let [parsedData, setParsedData] = React.useState(null)
	let [cbiData, setCbiData] = React.useState(null)
	let [cbyData, setCbyData] = React.useState(null)

	//Fetch dvs
	React.useEffect(() => {
		fetch('../data/dvs.json').then(data => {
			data.json().then(parsed => {
				setFiledata(parsed)
				return
			})
		})
	}, [])

	//Fetch questionsText
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

	//Set x && y values after questionText is set
	React.useEffect(() => {
		if(questionText && !xVal){
			setXVal("q42")
			setXType(typeof(fileData[0]["q42"]))
		}
	}, [questionText])

	//prep data for chart consumption after data is loaded
	React.useEffect(() => {
		if(fileData && xVal){
			
			// let dataToUse = (xVal == 'q9') ? //CountByIncome
					let cbiData = prepCountByIncomeData(fileData) //: 
				// (xVal == 'q42') ?  //CountByYears
					let cbyData = prepCountByYearsData(fileData)// : null

			setCbyData(cbyData)
			setCbiData(cbiData)
			// setParsedData(dataToUse)
		}
	}, [fileData, xVal])
	

	if(!questionText || !xVal || xType == null || cbiData == null || cbyData == null){
	  return(<p>Loading file data...</p>)
	}
	
	let axisObj = {
		x: {
			key: xVal,
			type: xType
		}
	}

	let axisObjTwo = {
		x: {
			key: 'q9',
			type: typeof(fileData[0]["q9"])
		}
	}
	
	console.log('questionText[xVal]')
	console.log(questionText[xVal])
	
	return(
	  <React.Fragment>
	    <h2>Data Explorer</h2>
	    <p>xValue: {questionText[xVal]} </p>
	    <p>yValue: Count of responses </p> {/* questionText[yVal]  */}
	    <Chart
	    	axis={axisObj} 
	    	data={cbyData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'bar'}
	    />
	  </React.Fragment>
	)
			
}

export default Home