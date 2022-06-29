import React, { Suspense } from 'react';
import { createRoot } from "react-dom/client";

import { RelayEnvironmentProvider } from "react-relay/hooks";
import { App } from './App';
import RelayEnv from "./RelayEnv";


function RootApp(props){
	return (
		<RelayEnvironmentProvider environment={RelayEnv}>
			<Suspense fallback={"Loading Continent/Country Data..."}>
				<App />
			</Suspense>
		</RelayEnvironmentProvider>
	)
}

const root = createRoot(document.getElementById('app'));
root.render(<RootApp/>);
