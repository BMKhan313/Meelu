import * as React from 'react';

function SvgBookmarkDashFill(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path
				fillRule='evenodd'
				d='M2 15.5V2a2 2 0 012-2h8a2 2 0 012 2v13.5a.5.5 0 01-.74.439L8 13.069l-5.26 2.87A.5.5 0 012 15.5zM6 6a.5.5 0 000 1h4a.5.5 0 000-1H6z'
			/>
		</svg>
	);
}

export default SvgBookmarkDashFill;
