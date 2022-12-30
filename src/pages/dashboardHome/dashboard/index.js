import React from 'react';
import ReactRoundedImage from 'react-rounded-image';
import Logo from '../../../assets/logos/logo.png';

const Dashboard = () => {
	return (
		<div className='w-100'>
			<div className='d-flex justify-content-around' style={{ height: 'max-content' }}>
				<div>
					<div className='h4'>MEELU</div>
					<div className='h5 d-flex justify-content-center'>ADDRESS</div>
				</div>
				<div className='d-flex justify-content-center'>
					<ReactRoundedImage
						roundedColor='#66A5CC'
						imageWidth='80'
						imageHeight='80'
						roundedSize='5'
						borderRadius='80'
						image={Logo}
					/>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
