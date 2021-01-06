import React from 'react'
import { connect } from "react-redux"
import {Route, Router} from "react-router"
import {Bootloader} from "./components/Bootloader"
import FormContainer from "./components/FormContainer"
import {LoginForm} from "./components/LoginForm"
import {Logout} from "./components/Logout"
import {privateRoute, routeGuardFC} from "./components/PrivateRoute"
import {Signup} from "./components/Signup"
import {history} from "./history"
import {AppState} from "./redux/constants/initial-states"
import {Data} from "./shared/types"
import {checkIfLoggedIn} from "./redux/actions/SignupActions";

type AppProps = {
    userData: Data
}

const App = (({userData}: AppProps) => {
    return (
        <main className='App'>
            <Router history={history}>
                <Bootloader stages={[
                    checkIfLoggedIn
                ]}>
                    <Route exact path="/">
                        {privateRoute(userData)}
                    </Route>
                    <Route exact path="/login" component={LoginForm} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/logout" component={Logout} />
                    <Route exact path="/form" render={routeGuardFC(userData, FormContainer)} />
                </Bootloader>
            </Router>
        </main>
    )
})

const mapStateToProps = (state: AppState) => {
    return {
        userData: state.session.userData
    }
}

// @ts-ignore
export default connect(mapStateToProps)(App);