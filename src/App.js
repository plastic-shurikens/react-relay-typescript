import React, { Fragment } from 'react';
import {CountriesPreloader} from './Countries';

export function App(){
	// console.log(process.env.H, 'h')
	return (
		<Fragment>
			<h1>All Countries</h1>
			<CountriesPreloader />
		</Fragment>
	)
}

