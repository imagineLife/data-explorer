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

	  let xScale = makeScaleType(xType, data, xVal, 'x')
	  xScale.range([0, wLM]);
	  
	  let yScale = makeScaleType('number', data, 'y');
	  yScale.range([hLM - margins.b, margins.t]);

	  console.log('%c CHART DATA mapped to bars', 'background-color: blue; color: white;')
	  console.log('data')
	  console.log(data)
	  console.log('%c ------', 'background-color: blue; color: white;')
	  
	  console.log('xScale.domain()')
	  console.log(xScale.domain())
	  // console.log('xScale.domain(data[0].x)')
	  // console.log(xScale.domain(data[0].x))
	  
	  let optRects;
	  if(chartType == 'bar'){
	  	optRects = data.map((d, ind) => {
		  	
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

	  	  	{optRects}
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