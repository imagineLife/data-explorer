import React from 'react';
import { makeScaleType } from '../helpers' 
import useDimensions from '../Hooks/useDimensions'

const BarChart = ({axis, fileData}) => {
	let thisRef = React.useRef()
	const [ref, {width}] = useDimensions();
	console.log('width')
	console.log(width)
	
	
	let {x: xAxis, y: yAxis} = axis
	let { xType, xVal } = xAxis;
	let { yType, yVal } = yAxis;

	let xScale = makeScaleType(xType, fileData, xVal)
	let yScale = makeScaleType(yType, fileData, yVal)
			
	return (
	  <div id="chartDiv" style={{height: '500px'}} ref={ref}>
	  	<svg width={width} height="100%" style={{border: "1px solid orange"}} />
	  </div>
	)
}

export default BarChart