import React from 'react';

function makeLine(xScale, yScale, d){
	return <line
  		x1={xScale(d.x)}
		  x2={xScale(d.x)}
		  y1={yScale(yScale.domain()[0])}
		  y2={yScale(d.y)}
  		stroke={'steelblue'}
  		strokeWidth={2} />
}

function makeCircle(xScale, yScale, d){
	return <circle 
		cx={xScale(d.x)}
		cy={yScale(d.y)}
		r={8}
		fill={"green"}/>
}

function makeRect(d, ind, xVal, xScale, yScale, maxHeight){
	return <rect
		key={`${ind}${d[xVal]}`}
		x={xScale(d.x)}
		y={yScale(d.y)}
		height={maxHeight - yScale(d.y)}
		fill={'steelblue'}
		width={xScale.bandwidth()} />
}

function makeLollipops(d,ind,xVal,yScale,xScale){
	let thisLine = makeLine(xScale,yScale,d)
	let thisCircle = makeCircle(xScale, yScale, d)
	return(<g key={`${ind}${d[xVal]}`}>
		{thisLine}
		{thisCircle}
  </g>)
}

export { makeLollipops, makeRect }