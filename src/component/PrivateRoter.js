import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoter({component:Component}) {
    const auth = useSelector(state => state.auth)
    if(auth.token)
    {
        return <Component/>
    }
    else{
        return <Navigate to="/login"/>
    }
}
