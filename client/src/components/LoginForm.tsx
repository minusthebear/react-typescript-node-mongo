import React, {FunctionComponent} from "react";
import {Formik, Form, Field, ErrorMessage, FormikValues} from "formik";
import {loginUser} from "../redux/actions/SignupActions";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";

type LoginFormProps = {
    login: Function
}

const LoginForm: FunctionComponent<LoginFormProps> = ({login}: LoginFormProps) => {
    return (
        <>
            <h1>
                Complete this form to create a new account.
            </h1>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validate={values => {
                    const errors: object = {};
                    if (values.username.length < 8) {
                        //@ts-ignore
                        errors.username = 'Invalid username'
                    }
                    if (values.password.length < 8) {
                        //@ts-ignore
                        errors.password = 'Invalid password'
                    }
                    return errors;
                }}
                onSubmit={({username, password}: FormikValues) => {
                    login(username, password)
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
                            <label htmlFor='password'>Password</label>
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
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
    return {
        login: (username: string, password: string ) => dispatch(loginUser(username,password))
    };
};

const ConnectedLogin = connect(null, mapDispatchToProps)(LoginForm);

export { ConnectedLogin as LoginForm };