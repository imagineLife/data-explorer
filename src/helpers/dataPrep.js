const prepCountByIncomeData = srcData => {
	let resArr = []
	/*
		PREP BAR DATA
		x = 
	*/
	srcData.forEach(d => {
		let thisXInResArr = resArr.filter(ra => ra.x == d["q9"])
		
		if(thisXInResArr.length < 1){
			resArr.push({
			  x: d["q9"],
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
	return resArr
}

export { prepCountByIncomeData }