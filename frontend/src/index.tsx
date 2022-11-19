import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';
import RouteGuard from './Routes/RouteGuard'

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Test from "./Routes/Test";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <RouteGuard redirectTo={"/login"}>
                        <Dashboard/>
                        </RouteGuard>
                    } />
                    <Route path='/login' element={<Login></Login>}/>
                    <Route path="/test" element={
                    <RouteGuard redirectTo={"/login"}>
                        <Test/>
                    </RouteGuard>} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
);
