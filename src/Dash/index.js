import React, { useEffect } from 'react';
import * as f from 'd3-fetch';
import { errorHandler } from './helpers'

let Dash = () => {

	let [data, setData] = React.useState(null)
	let [dataHeader, setDataHeader] = React.useState([])

	useEffect(() => {
		if(dataHeader.length > 0){
			console.log('%c DATA HEADER!', 'background-color: steelblue; color: blue;')
			console.log('dataHeader')
			console.log(dataHeader)
		}
	},[dataHeader])

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
		// console.log('table')
		// console.log(table)
		
		// document.getElementById("result").appendChild(table);
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
		console.log('%c ---lineHTMLFN---', 'background-color: steelblue; color: white;')
		
		console.log(id)
		console.log('// - - - - - //')
		
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
    console.log('arrOfRows')
    console.log(arrOfRows)

    // //build 'lines' array
    var lines = [];
    while(arrOfRows.length) {
        lines.push(arrOfRows.shift().split(','));
    }

    let header = lines[0]
   
   //build line string
    var lineHTML = ''
    
    let reMappedObj = {} //{...arrOfRows.shift().split(',')}
  	header.forEach(k => {
  		reMappedObj[k] = ''
  	})

  	// let finalArr = []
    // lines.forEach(line => {
    	// const {...reMappedObj} = {...line}


			// const { id, ...otherKeys } = {line} 
   //  	console.log('otherKeys')
   //  	console.log(otherKeys)
    	
    	// lineHTML += lineHTMLFn()
    // })
    

    // console.log('lineHTML')
		// console.log(lineHTML)

		

		let columnCount = header.length

		setDataHeader(header)
		setData(arrOfRows)
		
	}

	let handleFiles = (e) => {
		console.log('%c --HANDLING FILES!!', 'background-color: orange; color: black;')
		
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
			{dataHeader &&
				dataHeader.length > 0 &&
				<table>
					<thead>
						<tr>
							<th>Column</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{dataHeader.map(d => (
							<tr key={`${d}-header`}>
								<td>{d}</td>
								<td></td>
							</tr>))
						}
					</tbody>
				</table>
			}
		</main>
	)
}

export default Dash