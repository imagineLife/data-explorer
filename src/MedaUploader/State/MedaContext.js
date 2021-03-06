import React, { createContext, useState } from 'react';
import { errorHandler, getTypeOfCell, getContent, getTypesFromArray } from './../helpers'
import * as f from 'd3-fetch';
import * as ar from 'd3-array';

const MedaContext = createContext()
const { Provider } = MedaContext;

const MedaProvider = ({children}) => {
	
	let [data, setData] = useState([])
	let [dataHeader, setDataHeader] = useState([])
	let [types, setTypes] = useState([])
	let [selectedRow, setSelectedRow] = useState(null)

	function loadHandler(e){
		let content = getContent(e)

		var arrOfRows = content.split(/\r\n|\n/);

    // //build 'lines' array
    var lines = [];
    while(arrOfRows.length) {
        lines.push(arrOfRows.shift().split(','));
    }

    let header = lines[0]
   	let firstLine = lines[1]	

   	/*
			Get Types from data
   	*/
		let types = getTypesFromArray(firstLine)
		console.log('types')
		console.log(types)
		
		
		//Re-Usable header obj
		let headerObj = {}
		header.forEach((h,idx) => {
			headerObj[h] = null
		})
		
		let resData = []
		/*
			- convert csv arrays into key/val objects
			- store column-data in arrays by column-name in an objec
		*/

		lines.forEach((l,lIdx) => {
			//ignore header row
			if(lIdx === 0) return;
			/*
				- build json row data && push to resData
				- build arr of each column's data & prep to store in microSets
			*/
			let thisRowObj = {}
			l.forEach((cell, cellIdx) => {
				let thisCellTyped = getTypeOfCell(cell)
				let thisHeaderID = header[cellIdx]
				thisRowObj[thisHeaderID] = thisCellTyped
			})
			//push row data to resData array
			resData.push(thisRowObj)
		})
		
		setTypes(types)
		setDataHeader(header)
		setData(resData)
		
	}

	let handleFiles = (e) => {
		let files = e.target.files
		let fileToRead = files[0]

		var reader = new FileReader();
		// Handle errors load
		reader.onload = loadHandler;
		reader.onerror = errorHandler;
		// Read file into memory as UTF-8      
		reader.readAsText(fileToRead);
	}

	const rowClickHander = (rowData,idx) => {
		if(selectedRow !== null && selectedRow.id === rowData.id){
			setSelectedRow(null)
		}else{
			setSelectedRow({...rowData, ...{id: idx, rowID: rowData.id}})
		}
	}

	return <Provider value={{
		data, 
		setData,
		dataHeader, 
		setDataHeader,
		handleFiles
	}}>
		{children}
	</Provider>
}

export default MedaContext;
export { MedaProvider, MedaContext }