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

function makeCircle(xScale, yScale, d, ind, xVal, rad, f, fO, s, sW, sO, optCX){
	return <circle 
		key={xVal ? `${ind}-${xVal}` : ind}
		cx={optCX || xScale(d.x)}
		cy={yScale(d.y)}
		r={rad || 8}
		fill={f || "green"}
		fillOpacity={fO || 1}
		stroke={s || 'none'}
	  strokeWidth={sW || 0}
	  strokeOpacity={sO || 0}/>
}

function makePath(f,s,sW,clN, thisD){
		return<path
	 	  fill={f}
		  stroke={s}
		  strokeWidth={sW}
		  className={clN}
		  d={thisD}/>
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

export { makeLollipops, makeRect, makeCircle, makePath }