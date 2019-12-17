import React from 'react';
import * as f from 'd3-fetch';

let Dash = () => {
	let handleFiles = (e) => {
		console.log('%c --HANDLING FILES!!', 'background-color: orange; color: black;')
		
		let files = e.target.files
		// let splat = files.split('\\')
		// let fileString = splat[splat.length - 1]
		console.log('files')
		console.log(files)
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