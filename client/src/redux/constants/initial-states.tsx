import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {Data} from "../../shared/types";
import {defaultData, SessionActionTypes, SignupActionTypes} from "./action-types";

export type SignupState = {
    userExists: boolean,
    successfulCreate: boolean
}

export const SIGNUP_INITIAL_STATE: SignupState = {
    userExists:false,
    successfulCreate:false
}

export type SessionState = {
    userData: Data
}

export const SESSION_INITIAL_STATE: SessionState = {
    userData: {...defaultData}
}

export type AppState = {
    signup: SignupState,
    session: SessionState
}

export type Thunk<ReturnType = void> = ThunkAction<ReturnType, AppState, null, Action>
export type LoginDispatch = ThunkDispatch<AppState, void, SignupActionTypes | SessionActionTypes>