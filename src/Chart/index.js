import React from 'react';
import { makeScaleType } from '../helpers' 
import useDimensions from '../Hooks/useDimensions'
import AxesAndMath from '../Components/AxesAndMath'

const Chart = ({axis, data, w, h}) => {
	let thisRef = React.useRef()
	const [ref, {width}] = useDimensions();
	let [margins] = React.useState({t:20, r: 10, b: 75, l: 40})	

	//destructure props	
	let {x: xAxis, y: yAxis} = axis
	let { type: xType, key: xVal } = xAxis;
	let { type: yType, key: yVal } = yAxis;

	//update scales when width is changed
	if(width && width && h && xVal && yVal){

	  //set dimensions-less-margins
	  let wLM = width - margins.l - margins.r
	  let hLM = h - margins.t - margins.b

	  let xScale = makeScaleType(xType, data, xVal)
	  xScale.range([0, wLM]);
	  console.log('xScale.domain()')
	  console.log(xScale.domain())
	  console.log('xScale.range()')
	  console.log(xScale.range())
	  
	  
	  let yScale = makeScaleType(yType, data, yVal);
	  yScale.range([hLM - margins.b, margins.t]);
	  console.log('yScale.domain()')
	  console.log(yScale.domain())
	  console.log('yScale.range()')
	  console.log(yScale.range())
	  
	  let rects = data.map((d, ind) => {
	  	return <rect
	  		key={`${ind}${d[xVal]}`}
	  		x={xScale(d.x)}
	  		y={yScale(d.y)}
	  		height={hLM - yScale(d.y)}
	  		fill={'steelblue'}
	  		width={xScale.bandwidth()}></rect>
	  })

	  let svgDimensions = {
	  	height: h - margins.t,
	  	width: width - margins.l
	  }

	  console.log('svgDimensions')
	  console.log(svgDimensions)
	  
	  return (
	  <div id="chartDiv" style={{height: h, width: w}} ref={ref}>
	  	<svg className="barChart" width={width} height="100%" style={{border: "1px solid orange"}}>
	  	  <g transform={`translate(${margins.l}, ${margins.t})`}>
	  	  	
	  	  	<AxesAndMath
	          scales={{ xScale, yScale }}
	          margins={margins}
	          svgDimensions={svgDimensions}
	        />

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

export default Chart