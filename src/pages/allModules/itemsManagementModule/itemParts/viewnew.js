import React from 'react';

const Viewnew = ({ viewItem }) => {
	return (
		<div>
			<div className='table-responsive'>
				<table className='table table-modern'>
					<thead>
						<tr>
							<th>Company </th>
							<th>Primary</th>
							<th>Secondary</th>
						</tr>
					</thead>

					<tbody>
						{viewItem.machine_part_oem_part.oem_part_number.oem_part_numbercompany?.map(
							(item) => (
								<tr key={item.id}>
									<td>{item.company.name}</td>
									<td>{item.number1}</td>
									<td>{item.number2}</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Viewnew;
