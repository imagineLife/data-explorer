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

	function loadHandler(e){
		let content = getContent(e)
		var arrOfRows = content.split(/\r\n|\n/);
    // console.log('arrOfRows')
    // console.log(arrOfRows)
    
    var lines = [];
    while(arrOfRows.length) {
        lines.push(arrOfRows.shift().split(','));
    }
    // console.log('%c --**FIRST Line**--', 'background-color: orange; color: white;')
		let header = lines[0]
		// console.log(header)
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
		</main>
	)
}

export default Dash