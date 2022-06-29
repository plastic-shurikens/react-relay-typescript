import React, { Fragment } from 'react';
import {CountriesPreloader} from './Countries';

export function App(){
	return (
		<Fragment>
			<h1>All Countries</h1>
			<CountriesPreloader />
		</Fragment>
	)
}

