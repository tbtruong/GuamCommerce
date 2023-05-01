import React from 'react';
import {Navigate} from 'react-router-dom';
import axios from "axios"


export interface routeGuardComponentProps {
    children: any,
    redirectTo: string
}

const RouteGuard = ({children, redirectTo}: routeGuardComponentProps) => {

    function hasJWT() {
        //check user has JWT token
        return localStorage.getItem("token")
    }

    return hasJWT() ? children : <Navigate to={redirectTo}/>

    // async function verifyJWT() {
    //     let flag = false
    //     await axios.get('/authentication/validate', {
    //         headers: {
    //             jwt_token: localStorage.token
    //         }
    //     }).then((resp) => {
    //         if (resp.status === 200) {
    //             flag = true
    //         } else {
    //             flag = false
    //         }
    //     })
    //     return flag
    // }

    // return hasJWT() && await verifyJWT() ? children : <Navigate to={redirectTo}/>
};

export default RouteGuard;