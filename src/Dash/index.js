import React, { useEffect } from 'react';
import * as f from 'd3-fetch';
import * as ar from 'd3-array';
import { errorHandler } from './helpers'

let Dash = () => {

	let [data, setData] = React.useState([])
	let [dataHeader, setDataHeader] = React.useState([])
	let [types, setTypes] = React.useState([])
	useEffect(() => {
		if(dataHeader.length > 0){
			console.log('%c DATA HEADER!', 'background-color: steelblue; color: blue;')
			console.log('dataHeader')
			console.log(dataHeader)
		}
	},[dataHeader])

	const typedVal = (dat, d, idx, types) => {
		let thisType = types[idx]
		if(thisType === 'number'){
			return parseInt(dat[d])
		}else{
			return dat[d]
		}
	}

	const valOrNull = (dat, d, idx, types) => {
		let thisType = types[idx]
		if(thisType === 'number'){
			return parseInt(dat[d])
		}else{
			null
		}
	}

	function drawOutput(lines, colCount){
		//Clear previous data
		// document.getElementById("output").innerHTML = "";
		var table = document.createElement("table");
		for (var i = 0; i < lines.length; i++) {
			var row = table.insertRow(-1);
			for (var j = 0; j < lines[i].length; j++) {
				var firstNameCell = row.insertCell(-1);
				firstNameCell.appendChild(document.createTextNode(lines[i][j]));
			}
		}
	}

	const getContent = e => e.target.result;

	function lineHTMLFn({id,
			hosp,	
			station,	
			riskScore,	
			outlierOccurances,	
			daysOpen,	
			lastActivity, 
			...meds	
		}){
		
		return(<tr>
			<td>{id}</td>
			<td>{hosp}</td>
			<td>{station}</td>
			<td>{riskScore}</td>
			<td>{outlierOccurancse}</td>
			<td>{daysOpen}</td>
			<td>{lastActivity}</td>
			<td>{meds}</td>
		</tr>)
	}

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
		/*
			convert csv arrays into key/val objects
		*/

		lines.forEach((l,lIdx) => {
			if(lIdx === 0) return;
			let thisRowObj = {}
			l.forEach((cell, cellIdx) => {
				thisRowObj[header[cellIdx]] = cell
			})
			resData.push(thisRowObj)
		})
		
		setDataHeader(header)
		setData(resData)
		setTypes(types)
		
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

	return(
		<main> 
			<h2>New Dash</h2>
			<input type="file" accept=".csv" onChange={e => handleFiles(e)}/>
			<div id="result"/>
			{data.length > 0 && dataHeader &&
				dataHeader.length > 0 &&
				types &&
				types.length > 0 &&
				<table>
					<thead>
						<tr>
							<th>Column</th>
							<th>Type</th>
							<th>Min</th>
							<th>Max</th>
							<th>Mean</th>
							<th>Median</th>
							<th>
								<a 
									target="_blank" 
									href="http://mathworld.wolfram.com/SampleVariance.html"
								>Variance</a>
							</th>
						</tr>
					</thead>
					<tbody>
						{/* Loop Through header columns to create table cells */}
						{dataHeader.map((d, idx) => (
							<tr key={`${d}-header`}>
								<td>{d}</td>
								<td>{types[idx]}</td>
								<td>{ar.min(data, dat => {
									return typedVal(dat, d, idx, types)
								})}</td>
								<td>{ar.max(data, dat => {
									return typedVal(dat, d, idx, types)
								})}</td>
								<td>{ar.mean(data, dat => {
									return valOrNull(dat, d, idx, types)
								})}</td>
								<td>{ar.median(data, dat => {
									return valOrNull(dat, d, idx, types)
								})}</td>
								<td>{ar.variance(data, dat => {
									return valOrNull(dat, d, idx, types)
								})}</td>
							</tr>))
						}
					</tbody>
				</table>
			}
		</main>
	)
}

export default Dash