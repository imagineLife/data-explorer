import React from 'react';
import '../index.css'
import Chart from '../Chart'

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
	let [yVal, setYVal] = React.useState(null)
	let [xType, setXType] = React.useState(null)
	let [yType, setYType] = React.useState(null)
	let [parsedData, setParsedData] = React.useState(null)

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
			setYVal("q42")
			setYType(typeof(fileData[0]["q42"]))
			setXVal("q9")
			setXType(typeof(fileData[0]["q9"]))
		}
	}, [questionText])

	//prep data for chart consumption after data is loaded
	React.useEffect(() => {
		if(fileData && xVal && yVal){
			
			let resArr = []
			/*
				PREP BAR DATA
				x = 
			*/
			fileData.forEach(d => {
				let thisXInResArr = resArr.filter(ra => ra.x == d[xVal])
				
				if(thisXInResArr.length < 1){
					resArr.push({
					  x: d[xVal],
					  y: 1
					})
				}else{
				  thisXInResArr = thisXInResArr[0]
				  thisXInResArr.y = thisXInResArr.y + 1
				  
				  let newResArr = resArr.map(ra => {
				  	if(ra.x == thisXInResArr.x){
				  		return thisXInResArr
				  	}else{
				  		return ra
				  	}
				  })
				
				  resArr = newResArr
				}
			})

			setParsedData(resArr)
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
	
	return(
	  <React.Fragment>
	    <h2>Data Explorer</h2>
	    <p>xValue: {questionText[xVal]} </p>
	    <p>yValue: Count of responses </p> {/* questionText[yVal]  */}
	    <Chart
	    	axis={axisObj} 
	    	data={parsedData}
	    	w={'95%'} 
	    	h={550}
	    	chartType={'bar'}
	    />
	  </React.Fragment>
	)
			
}

export default Home