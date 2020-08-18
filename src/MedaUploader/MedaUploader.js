import React, { useContext, useEffect, Fragment, useState } from 'react';
import './index.css'

// State
import MedaContext from './State/MedaContext';

// Components
import TableHeader from './../Components/TableHeader';
import TableBody from './../Components/TableBody';

let Dash = () => {
	// import state
	const { data, handleFiles, dataHeader } = useContext(MedaContext)

	return(
		<main> 
			<h2>Data Explorer</h2>
			
			{/*Conditional Button*/}
			{data.length < 1 && <input 
				type="file" 
				accept=".csv" 
				name="Select CSV"
				onChange={e => handleFiles(e)}/>
			}

		{/*Conditional Table*/}
			{data.length > 0 && dataHeader &&
				<Fragment>
					<TableHeader d={dataHeader}/>
					<TableBody 
						keys={dataHeader} 
						d={data} 
					/>
				</Fragment>
			}
		</main>
	)
}

export default Dash