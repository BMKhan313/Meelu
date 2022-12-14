// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
import React from 'react';
import Button from '../../../../components/bootstrap/Button';

const Card = ({ title, count, name }) => {
	return (
		<div className='shadow-lg p-5 mb-5 bg-white rounded col-md-12 d-flex justify-content-around'>
			<div>
				<div className='d-flex justify-content-center'>{count}</div>
				<div>{title}</div>
			</div>
			<div className='align-items-center'>
				<Button color='primary' isLight icon='Add' hoverShadow='default'>
					Add {name}
				</Button>
			</div>
		</div>
	);
};

export default Card;
