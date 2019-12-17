import React from 'react';
import * as f from 'd3-fetch';

let Dash = () => {

	function drawOutput(lines){
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
		console.log('table')
		console.log(table)
		
		// document.getElementById("output").appendChild(table);
	}

	function processData(csv) {
	    var allTextLines = csv.split(/\r\n|\n/);
	    var lines = [];
	    while (allTextLines.length) {
	        lines.push(allTextLines.shift().split(','));
	    }
		console.log(lines);
		drawOutput(lines);
	}

	function loadHandler(event) {
		var csv = event.target.result;
		processData(csv);             
	}

	function errorHandler(evt) {
		if(evt.target.error.name == "NotReadableError") {
			alert("Canno't read file !");
		}
	}

	let handleFiles = (e) => {
		console.log('%c --HANDLING FILES!!', 'background-color: orange; color: black;')
		
		let files = e.target.files
		let fileToRead = files[0]
		// let splat = files.split('\\')
		// let fileString = splat[splat.length - 1]
		console.log('fileToRead')
		console.log(fileToRead)
		var reader = new FileReader();
		// Handle errors load
		reader.onload = loadHandler;
		reader.onerror = errorHandler;
		// Read file into memory as UTF-8      
		reader.readAsText(fileToRead);
		// let reader = new FileReader();
  //   reader.onload = function () {
  //       document.getElementById('out').innerHTML = reader.result;
  //   };
  //   // start reading the file. When it is done, calls the onload event defined above.
  //   reader.readAsBinaryString(e);
  	// f.csv(`./data/${fileString}`).then(data => {
  	// 	console.log('data')
  	// 	console.log(data)
  		
  	// })
	}
	return(
		<main> 
			<h2>New Dash</h2>
			<input type="file" accept=".csv" onChange={e => handleFiles(e)}/>
		</main>
	)
}

export default Dash