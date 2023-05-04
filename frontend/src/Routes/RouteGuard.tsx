import React, {useEffect, useState} from 'react';
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

    // const [flag, setFlag] = React.useState<undefined | boolean>(undefined)
    //
    // useEffect(() => {
    //     const callBackend = async () => {
    //         if (hasJWT()) {
    //            const returnBoolean = await verifyJWT();
    //            setFlag(returnBoolean);
    //         }
    //     }
    //     callBackend()
    // }, [])
    //
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
    //
    // if (flag !== undefined) {
    //     return flag ? children : <Navigate to={redirectTo}/>
    // }
};

export default RouteGuard;