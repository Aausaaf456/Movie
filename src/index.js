import React from 'react';
import ReactDom from 'react-dom/client';
import App1 from './App';
const root= ReactDom.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App1/>
    </React.StrictMode>
)