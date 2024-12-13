import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import reportWebVitals from './reportWebVitals.tsx';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
reportWebVitals(console.log);
