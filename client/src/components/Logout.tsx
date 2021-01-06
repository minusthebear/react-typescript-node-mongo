import React, {FunctionComponent} from "react";
import {Formik, Form, FormikValues} from "formik";
import {logoutUser} from "../redux/actions/SignupActions";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";

type LogoutFormProps = {
    logout: Function
}

const Logout: FunctionComponent<LogoutFormProps> = ({logout}: LogoutFormProps) => {
    return (
        <>
            <h1>
                Complete this form to create a new account.
            </h1>
            <Formik
                initialValues={{
                }}
                onSubmit={({username, password}: FormikValues) => {
                    logout(username, password)
                }}
            >
                <Form className="Form">
                    <button type="submit">
                        Press to logout
                    </button>
                </Form>
            </Formik>
        </>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        logout: () => dispatch(logoutUser())
    };
};

const ConnectedLogout = connect(null, mapDispatchToProps)(Logout);

export { ConnectedLogout as Logout };