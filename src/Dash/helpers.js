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

export { errorHandler, getTypeOfCell }