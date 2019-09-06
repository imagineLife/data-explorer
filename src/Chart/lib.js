import React from 'react';

function makeLollipops(d,ind,xVal,yScale,xScale){
	return(<g key={`${ind}${d[xVal]}`}>
		<line
  		x1={xScale(d.x)}
		  x2={xScale(d.x)}
		  y1={yScale(yScale.domain()[0])}
		  y2={yScale(d.y)}
  		stroke={'steelblue'}
  		strokeWidth={2} />
  	<circle 
			cx={xScale(d.x)}
			cy={yScale(d.y)}
			r={8}
			fill={"green"}/>
  </g>)
}

export { makeLollipops }