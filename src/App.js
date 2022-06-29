import React, { Fragment } from 'react';
import CountriesPreloader from './Countries';

export function App(){
	// console.log(process.env.H, 'h')
	return (
		<Fragment>
			<div>Hello this is app</div>
			<CountriesPreloader />
		</Fragment>
	)
}

