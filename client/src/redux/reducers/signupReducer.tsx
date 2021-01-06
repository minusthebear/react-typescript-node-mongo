import {SUCCESSFUL_CREATE, SignupActionTypes, USER_ALREADY_EXISTS} from "../constants/action-types";
import {SIGNUP_INITIAL_STATE, SignupState} from "../constants/initial-states";

export default function signupReducer(state: SignupState = SIGNUP_INITIAL_STATE, action: SignupActionTypes): SignupState {
    if (action.type === USER_ALREADY_EXISTS) {
        const obj: object = {
            userExists: true
        }
        return {
            ...state,
            ...obj
        }
    }
    if (action.type === SUCCESSFUL_CREATE) {
        const obj: object = {
            successfulCreate: true
        }
        return {
            ...state,
            ...obj
        }
    }
    return state;
}