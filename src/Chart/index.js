import React from 'react';
import { makeScaleType } from '../helpers' 
import useDimensions from '../Hooks/useDimensions'
import AxesAndMath from '../Components/AxesAndMath'


const xByType = (xVal, xType, xScale) => {
	if(xType == 'string'){
		return xScale(xVal) + (xScale.bandwidth() / 2)
	}else{
		return xScale(xVal)
	}
}
const Chart = ({axis, data, w, h, chartType, groupedX}) => {
	console.log('%c chartType', 'background-color: blue; color: white;')
	console.log(chartType);
	
	let thisRef = React.useRef()
	const [ref, {width}] = useDimensions();
	let [margins] = React.useState({t:20, r: 10, b: 75, l: 40})	

	//destructure props	
	let {x: xAxis, y: yAxis } = axis
	let { type: xType, key: xVal } = xAxis;
	let { type: yType, key: yVal } = yAxis;

	//update scales when width is changed
	if(width && width && h && xVal){

	  //set dimensions-less-margins
	  let wLM = width - margins.l - margins.r
	  let hLM = h - margins.t - margins.b

	  /*
			Build Scales
	  */
	  let xScale = makeScaleType(xType, data, xVal, 'x', chartType, groupedX)
	  xScale.range([0, wLM]);
	  
	  let yScale = makeScaleType(yType || 'number', data, yVal, 'y', chartType, groupedX);
	  yScale.range([hLM, margins.t]);

	  console.log('yScale.domain()')
	  console.log(yScale.domain())
	  console.log('yScale.range()')
	  console.log(yScale.range())
	  console.log('xScale.domain()')
	  console.log(xScale.domain())
	  console.log('xScale.range()')
	  console.log(xScale.range())
	  
	  
	  


	  /*
			Build Chart Elements
			Rects for bar
			Circles for scatterplot
	  */
	  let dataTypeShapes;


	  if(groupedX){
	  	dataTypeShapes = data.map((d, ind) => {
		  	
		  	//Work-around?!
		  	if(d.x == ""){
		  		return
		  	}

		  	return <rect
		  		key={`${ind}${d[xVal]}`}
		  		x={xScale(d.x)}
		  		y={yScale(d.y)}
		  		height={hLM - yScale(d.y)}
		  		fill={'steelblue'}
		  		width={xScale.bandwidth()}></rect>
		  }).filter(d => d)
	  }

	  if(chartType == 'scatterplot'){
	  	dataTypeShapes = data.map((d, ind) => {
	  		if(d.x == ''){
	  			return
	  		}
	  		return <circle
	  		  key={`${ind}${d[xVal]}`}
	  		  r={xScale.bandwidth() * .25}
	  		  cx={xByType(d.x, xType, xScale)}
	  		  cy={yScale(d.y)}
	  		  fill={'black'}
	  		  fillOpacity={.02}
	  		  stroke={'darkgray'}
	  		  strokeWidth={1}
	  		  strokeOpacity='.75'>
	  		  </circle>
	  	})
	  }

	  let svgDimensions = {
	  	height: h - margins.t,
	  	width: width - margins.l
	  }
	  
	  return (
	  <div id="chartDiv" style={{height: h, width: w}} ref={ref}>
	  	<svg className="barChart" width={width} height="100%" style={{border: "1px solid orange"}}>
	  	  <g transform={`translate(${margins.l}, ${margins.t})`}>
	  	  	
	  	  	<AxesAndMath
	          scales={{ xScale, yScale }}
	          margins={margins}
	          svgDimensions={svgDimensions}
	        />

	  	  	{dataTypeShapes}
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