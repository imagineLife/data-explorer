function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

const getTypeOfCell = dataItem => {
	let returnedItem = dataItem
	let thisType = 'string';
	let tryParseNum = parseInt(dataItem)
	if(tryParseNum > 0){
		thisType = 'number'
	}
	if(thisType === 'number'){
		returnedItem = parseInt(dataItem)
	}
	return returnedItem;
}

const getContent = e => e.target.result;

const getTypesFromArray = srcArr => {
	let resArr = []
	srcArr.forEach(l => {
		
		let thisType = (typeof l)			
		let tryNumberType = parseInt(l)
		let isNumber = tryNumberType > 0
		
		thisType = isNumber ? 'number' : 'string';
		resArr.push(thisType)
	})

	return resArr
}

export { errorHandler, getTypeOfCell, getContent, getTypesFromArray }