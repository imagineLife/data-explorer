import * as scale from 'd3-scale'
import * as arr from 'd3-array'

const makeScaleType = (type, srcData, pointName, axisName, chartType, groupedX) => {	
	console.log('%c MAKE SCALE TYPE', 'background-color: orange; color: white;')
	
	let thisScale;
	let uniqueArr;

	if(type == 'number'){
		thisScale = scale.scaleLinear()
	}

	if(axisName == 'x' && chartType == 'bar'){
		thisScale = scale.scaleBand().padding(.02)
	}

	if(type == 'number' && axisName == 'x' && chartType == 'scatter'){
		thisScale = scaleLinear()
	}

	if(pointName == 'y'){
		thisScale.domain(arr.extent(srcData, d => d.y))
	}

	//q9 == what is your yearly pay
	if(pointName == 'q9' && chartType == 'bar'){
		
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
	if(pointName == 'q42' && chartType == 'bar'){
		let domainVal = []
		srcData.forEach(d => {
			if(!domainVal.includes(d.x)){
				domainVal.push(d.x)
			}
		})		
		
		thisScale.domain(domainVal)
	}

	console.log('thisScale.domain()')
	console.log(thisScale.domain())
	console.log('thisScale.range()')
	console.log(thisScale.range())
	
	console.log('%c // - - - - - //', 'background-color: orange; color: white;')
	
	return thisScale
}

export default makeScaleType