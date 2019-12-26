import React, { useEffect, Fragment, useState } from 'react';
import * as f from 'd3-fetch';
import * as ar from 'd3-array';
import { errorHandler, getTypeOfCell, getContent, getTypesFromArray } from './helpers'
import './index.css'

let Dash = () => {

	let [data, setData] = useState([])
	let [dataHeader, setDataHeader] = useState([])
	let [microSets, setMicroSets] = useState({});
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
				if(!microDataSetObj[thisHeaderID].includes(thisCellTyped)){
					microDataSetObj[thisHeaderID].push(thisCellTyped)
					microDataSetObj[thisHeaderID].sort((a,b) => a - b)
				}
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

	const rowClickHander = (rowData,idx) => {
		if(selectedRow !== null && selectedRow.id === rowData.id){
			setSelectedRow(null)
		}else{
			setSelectedRow({...rowData, ...{id: idx, rowID: rowData.id}})
		}
	}
	
	if(microSets && microSets['riskScore']){
		let thisBin = ar.bin()
		let binned = thisBin(microSets['riskScore'])
		console.log('binned')
		console.log(binned)
	}

	return(
		<main> 
			<h2>Data Explorer</h2>
			{data.length < 1 && <input type="file" accept=".csv" onChange={e => handleFiles(e)}/>}
			{data.length > 0 && dataHeader &&
				dataHeader.length > 0 &&
				types &&
				types.length > 0 &&
				<Fragment>
					<table>
						<thead>
							<tr>
								<th colSpan="8">Data-Wide Stats</th>
							</tr>
							<tr>
								<th>Column</th>
								<th>Type</th>
								<th>Min</th>
								<th>Max</th>
								<th>Mean</th>
								<th>Median</th>
								<th>
									<a 
										hrf="https://www.statisticshowto.datasciencecentral.com/population-variance/" 
										target="_blank">Population Variance
									</a>
								</th>
								<th>
									<a 
										href="https://www.statisticshowto.datasciencecentral.com/probability-and-statistics/standard-deviation/"
										target="_blank">Deviation</a>
								</th>
							</tr>
						</thead>
						<tbody style={{textAlign: 'center'}}>
							{/* Loop Through header columns to create table cells */}
							{dataHeader.map((d, idx) => (
								<tr key={`${d}-header`}>
									<td>{d}</td>
									<td>{types[idx]}</td>
									<td>{ar.min(data, dataItem => dataItem[d])}</td>
									<td>{ar.max(data, dataItem => dataItem[d])}</td>
									<td>{ar.mean(data, dataItem => dataItem[d])}</td>
									<td>{ar.median(data, dataItem => dataItem[d])}</td>
									<td>{typeof data[1][d] === 'number' && ar.variance(data, dataItem => dataItem[d]).toFixed(2)}</td>
									<td>{typeof data[1][d] === 'number' && ar.deviation(data, dataItem => dataItem[d]).toFixed(2)}</td>
								</tr>))
							}
						</tbody>
					</table>

					<div>
						<h2>Rows</h2>
						<div className="max-height">
							<table className="data-table">
								<thead>
									<tr className="sticky-header">
										{dataHeader.map((dh, dhIdx) => (
											<th key={`single-data-cell-header-${dhIdx}`}>{dh}</th>))}
									</tr>
								</thead>
								<tbody className="details-table">
									{/* Loop Through header columns to create table cells */}
									{data.map((d, idx) => (
										<tr 
											key={`${idx}-row`} 
											onClick={() => rowClickHander(d, idx)}
											className={selectedRow && selectedRow.id === idx ? 'data-row selected-row': 'data-row '}>
											{dataHeader.map((dh, dhIdx) => (
												<td key={`single-data-cell-${d[dh]}-${dhIdx}`} className={dhIdx === 0 ? 'min-w-cell': dhIdx === 1 ? 'min-w-cell' : null}>{d[dh]}</td>))}
										</tr>))
									}
								</tbody>
							</table>
						</div>
					</div>
				</Fragment>
			}

			{
				selectedRow !== null && 
				<div className="top-right-box">
					<h3>{`${selectedRow.rowID} Stats`}</h3>
					<sub>&& comparison notes</sub>
					{Object.keys(selectedRow).map((k,idx) => {
						if(idx !== 0){
							let thisMS = microSets[k]
							let qint = null;
							if( typeof selectedRow[k] === 'number'){
								let lastMSArrVal = thisMS[thisMS.length - 1]
								qint = selectedRow[k] / lastMSArrVal
							}
							
							return (
								<div
									key={`${k}-${idx}`} 
									className="stat-wrapper">
									<span className="row-key">{k}</span>
									<span className="row-val">{selectedRow[k]}</span>
									{ typeof selectedRow[k] === 'number' && 
										<div className={'quantile-wrapper'}>
											<span>
												<a 
													href="https://en.wikipedia.org/wiki/Quantile" target="_blank">
													Quantile
												</a>
											</span>
											<span>{Math.trunc(qint * 100)}</span>
										</div>
									}
								</div>)
						}else{ return null}
					}).filter(d => d)}
				</div>
			}
		</main>
	)
}

export default Dash