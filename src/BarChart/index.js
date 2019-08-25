import React from 'react';
import { makeScaleType } from '../helpers' 
import useDims from '../Hooks/useDims'

const BarChart = ({axis, fileData}) => {
	const dims = useDims()
	console.log('dims')
	console.log(dims)
	
	
	let {x, y} = axis
	let { xType, xVal } = x;
	let { yType, yVal } = y;

	let xScale = makeScaleType(xType, fileData, xVal)
	let yScale = makeScaleType(yType, fileData, yVal)
			
	return (
	  <div id="chartDiv" style={{height: '500px'}}>
	  </div>
	)
}

export default BarChart