import React from 'react';
import {Navigate} from 'react-router-dom';

export interface routeGuardComponentProps {
    children: any,
    redirectTo: string
}

const RouteGuard = ({children, redirectTo}: routeGuardComponentProps) => {

    function hasJWT() {
        let flag = false;
        //check user has JWT token
        return localStorage.getItem("token")
    }

    return hasJWT() ? children : <Navigate to={redirectTo}/>
};

export default RouteGuard;