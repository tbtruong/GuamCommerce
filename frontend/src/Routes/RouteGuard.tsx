import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Test from './Test'

export interface routeGuardComponentProps {
    children: any,
    redirectTo: string
}

const RouteGuard = ({children, redirectTo}: routeGuardComponentProps) => {

    function hasJWT() {
        let flag = false;
        console.log('in JWT')
        //check user has JWT token
        return localStorage.getItem("token")
    }

    return hasJWT() ? children: <Navigate to={redirectTo}/>
};

export default RouteGuard;