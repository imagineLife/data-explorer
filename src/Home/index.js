import React from 'react';
import '../index.css'
import Chart from '../Chart'
import { prepBarChartData, prepScatterData } from '../helpers'

/*

	Q9 - What is your yearly pay?
	Q42 - How many years of experience do you have doing professional data visualization?

	Data Assumptions:
	1. the data comes in as an array
	2. the array has a bunch of objects with more assumptions...
		2a. the object keys are the same between objects
		2b. the object keys are mapped to another file, storing the text-content of the keys
	3. AREA charts DEMAND 
		pre-ordered categorically-scaled data
			areas can NOT 'figure-out' the order of the data
*/

const Home = () => {
	let [fileData, setFiledata] = React.useState(null)
	let [questionText, setQuestionText] = React.useState(null)
	let [xVal, setXVal] = React.useState(null)
	let [xType, setXType] = React.useState(null)
	let [yType, setYType] = React.useState(null)
	let [cbiData, setCbiData] = React.useState(null)
	let [cbyData, setCbyData] = React.useState(null)
	let [scatterData, setScatterData] = React.useState(null)

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
			
		  let cbiData = prepBarChartData(fileData, 'q9')
		  let cbyData = prepBarChartData(fileData, 'q42')
		  let scatData = prepScatterData(fileData, 'q9', 'q42')
		  // console.log('scatData')
		  // console.log(scatData)
		  
		  setCbyData(cbyData)
	 	  setCbiData(cbiData)
	 	  setScatterData(scatData)
		}
	}, [fileData, xVal])
	

	if(!questionText || !xVal || xType == null || cbiData == null || cbyData == null){
	  return(<p>Loading file data...</p>)
	}
	
	return(
	  <React.Fragment>
	    <h2>Data Explorer</h2>
	    <p>xValue: {questionText[xVal]} </p>
	    <p>yValue: Count of responses </p> {/* questionText[yVal]  */}
	    
			{/*
				x: # of yrs experience	
				y: count or resps
			*/}
	    
			<Chart
	    	axis={{
	    		x: {
						key: xVal,
						type: xType
					},
					y: {
						key: null,
						type: 'number'
					}
				}} 
	    	data={cbyData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'bar'}
	    	groupedX
	    />

	    {/*
	    	LINE version of above bar
				x: # of yrs experience	
				y: count or resps
			*/}
	    
			<Chart
	    	axis={{
	    		x: {
						key: xVal,
						type: xType
					},
					y: {
						key: null,
						type: 'number'
					}
				}} 
	    	data={cbyData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'line'}
	    	groupedX
	    />

	    {/*
	    	Area version of above bar
				x: # of yrs experience	
				y: count or resps
			*/}
	    
			<Chart
	    	axis={{
	    		x: {
						key: xVal,
						type: xType
					},
					y: {
						key: null,
						type: 'number'
					}
				}} 
	    	data={cbyData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'area'}
	    	groupedX
	    />

	    {/*
	    	Lollipop version of above bar
				x: # of yrs experience	
				y: count or resps
			*/}

	    <Chart
	    	axis={{
	    		x: {
						key: xVal,
						type: xType
					},
					y: {
						key: null,
						type: 'number'
					}
				}} 
	    	data={cbyData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'lollipop'}
	    	groupedX
	    />

	    {/*
				x: income-range	
				y: count or resps
			*/}
			
			<Chart
	    	axis={{
	    		x: {
						key: 'q9',
						type: 'string'
					},
					y: {
						key: null,
						type: 'number'
					}
	    	}} 
	    	data={cbiData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'bar'}
	    	groupedX
	    />

	    {/*
	    	LINE version of above bar
				x: income-range	
				y: count or resps
			*/}
	    <Chart
	    	axis={{
	    		x: {
						key: 'q9',
						type: 'string'
					},
					y: {
						key: null,
						type: 'number'
					}
	    	}} 
	    	data={cbiData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'line'}
	    	groupedX
	    />

	    {/*
	    	Area version of above bar
				x: income-range	
				y: count or resps
			*/}
	    <Chart
	    	axis={{
	    		x: {
						key: 'q9',
						type: 'string'
					},
					y: {
						key: null,
						type: 'number'
					}
	    	}} 
	    	data={cbiData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'area'}
	    	groupedX
	    />

	    {/*
	    	Lollipop version of above bar
				x: income-range	
				y: count or resps
			*/}
	    <Chart
	    	axis={{
	    		x: {
						key: 'q9',
						type: 'string'
					},
					y: {
						key: null,
						type: 'number'
					}
	    	}} 
	    	data={cbiData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'lollipop'}
	    	groupedX
	    />

	    {/*
				x: income-range, grouped
				y: years experience, linear
			*/}
			
			<Chart
	    	axis={{
	    		x: {
						key: 'q9',
						type: 'string'
					},
					y: {
						key: 'q42',
						type: 'number'
					}
	    	}} 
	    	data={scatterData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'scatterplot'}
	    />
	  </React.Fragment>
	)
			
}

export default Home