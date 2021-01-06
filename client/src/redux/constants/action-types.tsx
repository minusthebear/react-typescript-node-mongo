import {Data} from "../../shared/types";

export const USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS";
export const SET_SESSION = "SET_SESSION"
export const SUCCESSFUL_CREATE = "SUCCESSFUL_CREATE"
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED'
export const LOGOUT_USER = "SUCCESSFUL_CREATE"

export const defaultData: Data = {
    token: "",
    profile: null
}

export interface UserAlreadyExists {
    type: typeof USER_ALREADY_EXISTS
}

export interface SuccessfulCreate {
    type: typeof SUCCESSFUL_CREATE
}

export interface SetSession {
    type: typeof SET_SESSION,
    data: Data
}

export interface LogoutUser {
    type: typeof LOGOUT_USER
}

export interface NotAuthenticated {
    type: typeof NOT_AUTHENTICATED
}

export type SignupActionTypes = UserAlreadyExists | SuccessfulCreate;
export type SessionActionTypes = SetSession | LogoutUser | NotAuthenticated;