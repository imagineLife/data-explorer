import React from 'react';
import * as scale from 'd3-scale'
import * as arr from 'd3-array'

const makeScaleType = (type, srcData, pointName) => {

	let thisScale;
	let uniqueArr;
	if(type == 'string'){
		thisScale = scale.scaleOrdinal()
	}
	if(type == 'number'){
		thisScale = scale.scaleLinear()
	}
	if(pointName == 'q9'){
		let xVals = srcData.map(d => d[pointName])
		uniqueArr = xVals.filter((d, idx) => xVals.indexOf(d) === idx);
		if(uniqueArr[0].includes('$40')){
			uniqueArr = [
			  "", 
			  "Less than $20,000", 
			  "$20k - $40k", 
			  "$40k - $60K", 
			  "$60k - $80k", 
			  "$80k - $100k", 
			  "$100k - $120k", 
			  "$120k - $140k", 
			  "$140k - $160k", 
			  "$160k - $180k", 
			  "$180k - $2000k", 
			  "$200k+"
		    ]
		}
		thisScale.domain(uniqueArr)
	}

	if(pointName == 'q42'){
		let extentVal = arr.extent(srcData, d => d['q42'])
		extentVal[0] = 0;
		thisScale.domain(extentVal)
	}
	
	return thisScale
}

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
	
	//get keys from object
	const dataKeys = Object.keys(fileData[0])
	const dataTypes = dataKeys.map((k,ind) => {
		let thisVal = fileData[0][k]
		return typeof thisVal
	})

	console.log('questionText')
	console.log(questionText)
	
	
	return(
	  <React.Fragment>
	    <h2>Data Explorer</h2>
	    <p>xValue: {questionText[xVal]} </p>
	    <p>yValue: {questionText[yVal]} </p>
	  </React.Fragment>
	)
			
}

export default Home