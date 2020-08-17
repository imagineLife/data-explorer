import React from 'react';
import './TableBody.scss'

const TableBody = ({d, keys}) => {
	return (<table id="body">
	<tbody>
		{/**/}
		{d.map((row, rowIdx) => (
			<tr key={`body-row-${rowIdx}`}>
				{keys.map((dataKey, kIdx) => (
					<td key={`cell-${dataKey}-${kIdx}-${rowIdx}`} id={`${dataKey}-${row[dataKey]}`}>
						{row[dataKey]}
					</td>
				))}
			</tr>
		))}
	</tbody>
</table>)
};

export default TableBody;
