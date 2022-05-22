import React from 'react';
import App from './app';
import reportWebVitals from './report-web-vitals';
import {Provider} from 'react-redux';
import store from './store';
import {createRoot} from 'react-dom/client';

const container = document.querySelector('#root');
if (!container) {
	throw new Error('Unable to location application root');
}

const root = createRoot(container);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
