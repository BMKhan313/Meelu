import React from 'react';
import ReactRoundedImage from 'react-rounded-image';
import Logo from '../../../assets/logos/logo.png';
// import Card from './Items/Card';

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

			{/* <div className='mt-3'>
				<div className='row p-3'>
					<div className='col-md-4'>
						<Card count='54' title='Doctors' name='Doctor' />
					</div>

					<div className='col-md-4'>
						<Card count='1976' title='Patients' name='Patient' />
					</div>

					<div className='col-md-4'>
						<Card count='156' title='Nurse' name='Nurse' />
					</div>
				</div>

				<div className='row p-3'>
					<div className='col-md-4'>
						<Card count='4' title='Pharmacies' name='Pharmacy' />
					</div>

					<div className='col-md-4'>
						<Card count='19' title='Departments' name='Department' />
					</div>

					<div className='col-md-4'>
						<Card count='7' title='Branches' name='Branch' />
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Dashboard;
