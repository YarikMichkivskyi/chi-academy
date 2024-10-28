import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const domContainer = document.getElementById('root');
const root = ReactDOM.createRoot(domContainer);
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
