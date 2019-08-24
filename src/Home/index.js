import React from 'react';


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
					console.log('questions')
					console.log(questions)
					
					return
				}).then(() => {
					console.log('Here?!')
				});
			})
		}
	}, [fileData])


	React.useEffect(() => {
		if(questionText && !xVal){
			setXVal(questionText["q42"])
			setYVal(questionText["q9"])
		}
	}, [questionText])



	if(!questionText || !xVal || !yVal){
	  return(<p>No File Data</p>)
	}

	console.log('xVal')
	console.log(xVal)
	console.log('yVal')
	console.log(yVal)
	
	//get keys from object
	const dataKeys = Object.keys(fileData[0])
	const dataTypes = dataKeys.map((k,ind) => {
		let thisVal = fileData[0][k]
		return typeof thisVal
	})
	
	return(
	  <React.Fragment>
	    <h2>Data Explorer</h2>
	    <p>xValue: {xVal} </p>
	    <p>yValue: {yVal} </p>
	  </React.Fragment>
	)
			
}

export default Home