import React from 'react';
import { makeScaleType } from '../helpers' 
import useDimensions from '../Hooks/useDimensions'
import AxesAndMath from '../Components/AxesAndMath'

const Chart = ({axis, data, w, h, chartType}) => {
	let thisRef = React.useRef()
	const [ref, {width}] = useDimensions();
	let [margins] = React.useState({t:20, r: 10, b: 75, l: 40})	

	//destructure props	
	let {x: xAxis, y: yAxis} = axis
	let { type: xType, key: xVal } = xAxis;

	//update scales when width is changed
	if(width && width && h && xVal){

	  //set dimensions-less-margins
	  let wLM = width - margins.l - margins.r
	  let hLM = h - margins.t - margins.b

	  /*
			Build Scales
	  */
	  let xScale = makeScaleType(xType, data, xVal, 'x')
	  xScale.range([0, wLM]);
	  
	  let yScale = makeScaleType('number', data, 'y', null);
	  yScale.range([hLM - margins.b, margins.t]);
	  

	  /*
			Build Chart Elements
			Rects for bar
			Circles for scatterplot
	  */
	  let dataTypeShapes;


	  if(chartType == 'bar'){
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
	  	dataTypeShapes = <text>Scatterplot here!</text>
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