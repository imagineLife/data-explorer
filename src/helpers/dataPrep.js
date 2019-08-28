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

const prepCountByYearsData = srcData => {
	let resArr = []
	/*
		PREP BAR DATA
		x = 
	*/
	srcData.forEach(d => {
		let thisXInResArr = resArr.filter(ra => ra.x == d["q42"])
		
		if(thisXInResArr.length < 1){
			resArr.push({
			  x: d["q42"],
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
	console.log('resArr')
	console.log(resArr)

	return resArr
}

export { prepCountByIncomeData, prepCountByYearsData }