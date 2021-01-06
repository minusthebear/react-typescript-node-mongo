import {
    LOGOUT_USER,
    NOT_AUTHENTICATED,
    SessionActionTypes,
    SET_SESSION,
    SignupActionTypes,
    SUCCESSFUL_CREATE,
    USER_ALREADY_EXISTS
} from "../constants/action-types"
import axios, {AxiosError, AxiosResponse} from "axios"
import {LoginDispatch, Thunk} from "../constants/initial-states"
import cookie from "react-cookies"
import {history} from "../../history"
import {Data} from "../../shared/types"
import {Dispatch} from "redux";

const axiosErrorHandler = (err: AxiosError, dispatch: LoginDispatch): void => {
    console.log(err)
    dispatch(userExists())
}

const loginHandler = (res: AxiosResponse<Data>, dispatch: Dispatch): void => {
    if (!res.data.token) {
        throw new Error()
    }
    cookie.save('sid', res.data.token, { path: '/', maxAge: 60 * 20});
    dispatch(successfulCreate())
    dispatch(setSession(res.data))
    history.push('/')
}

const logoutHandler = (res: AxiosResponse<Data>, dispatch: Dispatch): void => {
    if (res.status !== 200) {
        throw new Error()
    }
    cookie.remove('sid')
    dispatch(logout())
    history.push('/');
}

const sessionCheckHandler = (res: AxiosResponse<Data>, dispatch: Dispatch): void => {
    if (!res.data.token || cookie.load('sid') !== res.data.token) {
        sessionErrorHandler(dispatch)
    } else {
        cookie.save('sid', res.data.token, { path: '/', maxAge: 60 * 20})
        dispatch(setSession(res.data))
    }
}

const sessionErrorHandler = (dispatch: Dispatch): void => {
    cookie.remove('sid')
    dispatch(notAuthenticated())
}

const signupErrorHandler = (err: AxiosError, dispatch: Dispatch): void => {
    if (err.response && err.response.status === 500) {
        dispatch(userExists());
    } else {
        // PLACEHOLDER
        dispatch(userExists());
    }
}

export const checkIfLoggedIn = async (dispatch: Dispatch): Promise<void> => {
    await
        axios.get("/session-check", { withCredentials: true })
            .then((res: AxiosResponse<Data>) => sessionCheckHandler(res, dispatch))
            .catch(() => sessionErrorHandler(dispatch))
}

export const loginUser = (name:string, password:string): Thunk => {
    return async (dispatch: LoginDispatch): Promise<void> => {
        await
            axios.post('/login-user', {name, password})
                .then((res: AxiosResponse<Data>) => loginHandler(res, dispatch))
                .catch((err: AxiosError) => axiosErrorHandler(err, dispatch))
    }
}

export const logoutUser = (): Thunk => {
    return async (dispatch: LoginDispatch): Promise<void> => {
        await
            axios.delete('/logout-user', {withCredentials: true})
                .then((res: AxiosResponse<Data>) => logoutHandler(res, dispatch))
                .catch((err: AxiosError) => axiosErrorHandler(err, dispatch))
    }
}

export const requestCreateUserAccount = (name:string, password:string): Thunk => {
    return async (dispatch: LoginDispatch): Promise<void> => {
        await
            axios.post('/create-user', {name, password})
                .then((res: AxiosResponse<Data>) => loginHandler(res, dispatch))
                .catch((err: AxiosError) => signupErrorHandler(err, dispatch))

    }
}

export function logout(): SessionActionTypes {
    return { type: LOGOUT_USER }
}

export function notAuthenticated(): SessionActionTypes {
    return { type: NOT_AUTHENTICATED }
}

export function setSession(data: Data): SessionActionTypes {
    return { type: SET_SESSION, data }
}

export function successfulCreate(): SignupActionTypes {
    return { type: SUCCESSFUL_CREATE }
}

export function userExists(): SignupActionTypes {
    return { type: USER_ALREADY_EXISTS }
}