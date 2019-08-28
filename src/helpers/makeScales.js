import * as scale from 'd3-scale'
import * as arr from 'd3-array'

const makeScaleType = (type, srcData, pointName) => {	
	
	let thisScale;
	let uniqueArr;
	if(type == 'string'){
		thisScale = scale.scaleBand().padding(.05)
	}
	if(type == 'number'){
		thisScale = scale.scaleLinear()
	}

	//q9 == what is your yearly pay
	if(pointName == 'q9'){
		let xVals = srcData.map(d => d.x)
		
		uniqueArr = xVals.filter((d, idx) => xVals.indexOf(d) === idx);
		let typeOfVal = typeof uniqueArr[0]
		console.log('uniqueArr')
		console.log(uniqueArr)
		
		
		
		if(typeOfVal == 'string' && uniqueArr[0].includes('$40')){
			uniqueArr = [
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
		}
		thisScale.domain(uniqueArr)
	}

	//how many years experience
	if(pointName == 'q42'){
		let extentVal = (typeof srcData[0].y == 'number') ? arr.extent(srcData, d => d.y) : [0, 100]
		extentVal[0] = 0;
		thisScale.domain(extentVal)
		console.log('thisScale.domain()')
		console.log(thisScale.domain())
		
	}
	
	return thisScale
}

export default makeScaleType