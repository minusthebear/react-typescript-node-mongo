import React, {FunctionComponent} from "react";
import {connect} from "react-redux";
import {Formik, Field, ErrorMessage, Form, FormikValues} from "formik";
import {USERNAME_REGEX, PASSWORD_REGEX} from "../constants";
import * as Yup from "yup";
import {requestCreateUserAccount} from "../redux/actions/SignupActions";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../redux/constants/initial-states";

interface SignupProps {
    userExists: boolean,
    requestCreateUserAccount: Function
}

const Signup: FunctionComponent<SignupProps> = ({userExists, requestCreateUserAccount}: SignupProps) => {
    return (
        <>
            <h1>
                Complete this form to create a new account.
            </h1>
            <h1>
                User Exists: {`${userExists}`}
            </h1>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    password_two: ''
                }}
                validationSchema={
                    Yup.object().shape({
                        username:
                            Yup.string()
                                .required('Username is required')
                                .min(8, "Username must be at least 8 characters")
                                .matches(USERNAME_REGEX, "Username must be only alphanumeric characters"),
                        password:
                            Yup.string()
                                .required('Password is required')
                                .min(8, "Password must be at least 8 characters")
                                .matches(PASSWORD_REGEX, "Password must be only alphanumeric characters"),
                        password_two:
                            Yup.string()
                                .required('Password is required')
                                .min(8, "Password must be at least 8 characters")
                                .matches(PASSWORD_REGEX, "Password must be only alphanumeric characters")
                    })
                }
                validate={(values: FormikValues) => {
                    const errors: object = {};
                    if (values.password !== values.password_two) {
                        //@ts-ignore
                        errors.password_two = 'Passwords must match'
                    }
                    return errors;
                }}
                onSubmit={({username, password}: FormikValues) => {
                    requestCreateUserAccount({username, password})
                }}
            >

                <Form className="Form">
                    <div>
                        <div>
                            <label htmlFor="username">User Name</label>
                            <Field
                                type="username"
                                name="username"
                                className="form-control mt-2"
                                placeholder="User Name"
                            />
                            <div className="error-container">
                                <ErrorMessage name="username" component="div" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                className="form-control mt-2"
                                placeholder="Password"
                            />
                            <div className="error-container">
                                <ErrorMessage name="password" component="div" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password_two">Confirm Password</label>
                            <Field
                                type="password"
                                name="password_two"
                                className="form-control mt-2"
                                placeholder="Confirm Password"
                            />
                            <div className="error-container">
                                <ErrorMessage name="password_two" component="div" />
                            </div>
                        </div>
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        userExists: state.signup.userExists,
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        requestCreateUserAccount: (username: string, password: string ) => dispatch(requestCreateUserAccount(username,password))
    };
};

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);

export { ConnectedSignup as Signup };