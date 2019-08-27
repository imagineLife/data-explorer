import React from 'react';
import { makeScaleType } from '../helpers' 
import useDimensions from '../Hooks/useDimensions'

const BarChart = ({axis, data, w, h}) => {
	let thisRef = React.useRef()
	const [ref, {width}] = useDimensions();
	let [margins] = React.useState({t:10, r: 10, b: 10, l: 10})	

	//destructure props	
	let {x: xAxis, y: yAxis} = axis
	let { type: xType, key: xVal } = xAxis;
	let { type: yType, key: yVal } = yAxis;
	
	//set dimensions-less-margins
	let wLM = width - margins.l - margins.r
	let hLM = width - margins.t - margins.b

	//update scales when width is changed
	if(width && h && xVal && yVal){
	  let xScale = makeScaleType(xType, data, xVal)
	  xScale.range([margins.l, width - margins.r]);

	  let yScale = makeScaleType(yType, data, yVal);
	  yScale.range([h - margins.b, margins.t]);
	  
	  let rects = data.map((d, ind) => {
	  	return <rect
	  		key={`${ind}${d[xVal]}`}
	  		x={xScale(d[xVal])}
	  		y={yScale(d[yVal])}
	  		height={h - margins.b - yScale(d[yVal])}
	  		width={xScale.bandwidth()}></rect>
	  })
	  return (
	  <div id="chartDiv" style={{height: h, width: w}} ref={ref}>
	  	<svg className="barChart" width={width} height="100%" style={{border: "1px solid orange"}}>
	  	  <g transform={`translate(${margins.l}, ${margins.t})`}>
	  	  	{rects}
	  	  </g>
	  	</svg>
	  </div>
	  )
	}

	if(!width){
		return(<div id="chartDiv" style={{height: h, width: w}} ref={ref}></div>)
	}
}

export default BarChart