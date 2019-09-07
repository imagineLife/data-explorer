import * as scale from 'd3-scale'
import * as arr from 'd3-array'

const makeScaleType = (dataPointType, srcData, pointName, axisName, chartType, groupedX) => {	
	// console.log('%c MAKE SCALE TYPE', 'background-color: orange; color: white;')
	
	let thisScale;
	let uniqueArr;

/*
	Scale - Type
*/
	if(dataPointType == 'number'){
		thisScale = scale.scaleLinear()
	}

	if(dataPointType !== 'number'){
		thisScale = scale.scaleLinear()
	}

	if(axisName == 'x'){ // && chartType == 'bar'
		if(chartType !== 'area'){
			thisScale = scale.scaleBand().padding(.02)
		}
		if(chartType == 'area'){
			thisScale = scale.scaleBand()
		}
	}

/*
	Scale Domain
*/

	if(axisName == 'y'){
		let maxVal = [arr.max(srcData, d => d.y)]
		thisScale.domain([0,maxVal])
	}

	//q9 == what is your yearly pay
	if(pointName == 'q9'){
		
		let uniqueArr = [
		  // "", 
		  "Less than $20,000", 
		  "$20k - $40k", 
		  "$40k - $60k", 
		  "$60k - $80k", 
		  "$80k - $100k", 
		  "$100k - $120k", 
		  "$120k - $140k", 
		  "$140k - $160k", 
		  "$160k - $180k", 
		  "$180k - $200k", 
		  "$200k+"
	    ]
		
		thisScale.domain(uniqueArr)
	}

	//how many years experience
	if(pointName == 'q42' && groupedX == true){ //&& chartType == 'bar'
		let domainVal = []
		srcData.forEach(d => {
			if(!domainVal.includes(d.x)){
				domainVal.push(d.x)
			}
		})		
		
		thisScale.domain(domainVal)
	}
	
	// console.log('%c // - - - - - //', 'background-color: orange; color: white;')
	
	return thisScale
}

export default makeScaleType