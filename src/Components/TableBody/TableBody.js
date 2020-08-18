import React from 'react';
import './TableBody.scss'

const TableBody = ({d, keys}) => {
	return (<table id="body">
	<tbody>
		{/**/}
		{d.map((row, rowIdx) => (
			<tr key={`body-row-${rowIdx}`}>
				{keys.map((dataKey, kIdx) => {
					const cleanString = row[dataKey].toString().replace(/"/g,'').replace(/\|/g,', ')
					return (
						<td 
							key={`cell-${dataKey}-${kIdx}-${rowIdx}`} 
							id={`${dataKey}-${row[dataKey]}`}
						>
							<span>{cleanString}</span>
						</td>
					)
				})}
			</tr>
		))}
	</tbody>
</table>)
};

export default TableBody;
