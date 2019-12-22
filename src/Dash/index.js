import React, { useEffect } from 'react';
import * as f from 'd3-fetch';
import * as ar from 'd3-array';
import { errorHandler, getTypeOfCell } from './helpers'

let Dash = () => {

	let [data, setData] = React.useState([])
	let [dataHeader, setDataHeader] = React.useState([])
	let [microSets, setMicroSets] = React.useState([]);
	let [types, setTypes] = React.useState([])

	const getContent = e => e.target.result;

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
		let types = []
		firstLine.forEach(l => {
			
			let thisType = (typeof l)			
			let tryNumberType = parseInt(l)
			let isNumber = tryNumberType > 0
			
			thisType = isNumber ? 'number' : 'string';
			types.push(thisType)
		})
		
		//Re-Usable header obj
		let headerObj = {}
		header.forEach((h,idx) => {
			headerObj[h] = null
		})
		
		let resData = []
		let microDataSetObj = {...headerObj}
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

				if(microDataSetObj[thisHeaderID] == null){
					microDataSetObj[thisHeaderID] = []
				}

				//push cell value to matching-header-micro-data-set
				microDataSetObj[thisHeaderID].push(thisCellTyped)
			})
			//push row data to resData array
			resData.push(thisRowObj)
		})
		
		setTypes(types)
		setDataHeader(header)
		setData(resData)
		setMicroSets(microDataSetObj)
		
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

	console.log('microSets')
	console.log(microSets)
	console.log('data')
	console.log(data)
	

	return(
		<main> 
			<h2>New Dash</h2>
			{data.length < 1 && <input type="file" accept=".csv" onChange={e => handleFiles(e)}/>}
			{data.length > 0 && dataHeader &&
				dataHeader.length > 0 &&
				types &&
				types.length > 0 &&
				<table>
					<thead>
						<tr>
							<th colSpan="6">Data-Wide Stats</th>
						</tr>
						<tr>
							<th>Column</th>
							<th>Type</th>
							<th>Min</th>
							<th>Max</th>
							<th>Mean</th>
							<th>Median</th>
						</tr>
					</thead>
					<tbody>
						{/* Loop Through header columns to create table cells */}
						{dataHeader.map((d, idx) => (
							<tr key={`${d}-header`}>
								<td>{d}</td>
								<td>{types[idx]}</td>
								<td>{ar.min(data, dataItem => dataItem[d])}</td>
								<td>{ar.max(data, dataItem => dataItem[d])}</td>
								<td>{ar.mean(data, dataItem => dataItem[d])}</td>
								<td>{ar.median(data, dataItem => dataItem[d])}</td>
							</tr>))
						}
					</tbody>
				</table>
			}
		</main>
	)
}

export default Dash