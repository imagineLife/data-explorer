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

export default makeScaleType