import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FlightsMonitor from "./pages/FlightsMonitor";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// removed strict mode because MobX causes observed components to render twice
root.render(
    <FlightsMonitor />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
