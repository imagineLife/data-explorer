/*
	Groups by xKey && returns arr of objs
	{
	x: xVal,
	y: countAtThisXVal
	}
*/
const prepBarChartData = (srcData, xKey) => {
	let resArr = []
	/*
		PREP BAR DATA
		x = 
	*/
	srcData.forEach(d => {
		let thisXInResArr = resArr.filter(ra => ra.x == d[xKey])
		
		if(thisXInResArr.length < 1){
			resArr.push({
			  x: d[xKey],
			  y: 1
			})
		}else{
		  thisXInResArr = thisXInResArr[0]
		  thisXInResArr.y = thisXInResArr.y + 1
		  
		  let newResArr = resArr.map(ra => {
		  	if(ra.x == thisXInResArr.x){
		  		return thisXInResArr
		  	}else{
		  		return ra
		  	}
		  })
		
		  resArr = newResArr
		}
	})

	resArr.sort((a,b) => a.x - b.x)

	return resArr
}


const prepScatterData = (srcData, xVal, yVal) => {
	let resArr = []
	resArr = srcData.map(d => {
		return {
			x: d[xVal],
			y: d[yVal]
		}
	})
	return resArr
}
export { prepBarChartData, prepScatterData }