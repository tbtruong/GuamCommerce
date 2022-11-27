import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';
import RouteGuard from './Routes/RouteGuard'
import { ThemeProvider } from '@mui/material/styles';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Test from "./Routes/Test";
import {theme} from "./theme";
import Groceries from "./Routes/Groceries";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
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
                        <Route path="/groceries" element={
                            <RouteGuard redirectTo={"/login"}>
                                <Groceries/>
                            </RouteGuard>} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
);
