import React from 'react';

const Viewnew = ({viewItem}) => {
  
    console.log(viewItem,'viewItem')
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
                        {viewItem.machine_part_oem_part.oem_part_number.oem_part_number_company?.map(
								(item) => (
                                    <tr key={item.id}>
                                    <td>{item.company.name}</td>

									</tr>
								),
							)}
						</tbody>
					</table>
                    </div>
    </div>
  )
}

export default Viewnew;