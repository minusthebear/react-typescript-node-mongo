import React from "react"
import {Redirect, RouteProps} from "react-router";
import {Data} from "../shared/types";

export const privateRoute = (userData: Data): JSX.Element => {
    return userData.token ? <Redirect to="/form" /> : <Redirect to="/login" />
}

export const routeGuardFC = (userData: Data, Route: React.ComponentType) => (props: RouteProps) => {
    return userData.token ? (<Route {...props} />) : <Redirect to="/login" />
}