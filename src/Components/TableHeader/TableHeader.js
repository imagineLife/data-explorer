import React from 'react';
import './TableHeader.scss';

const TableHeader = ({d}) => (<table>
	<thead id="table-header">
		<tr>
			{d.map((itm, idx) => (
				<td key={`header-${idx}`}>
					{itm}
				</td>
			))}
		</tr>
	</thead>
</table>);

export default TableHeader;
