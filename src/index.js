import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ParkingPal } from './components/ParkingPal';


const container = document.getElementById("root")
const root = ReactDOM.createRoot(container)
root.render(
    <BrowserRouter>
        <ParkingPal />
    </BrowserRouter>
)


