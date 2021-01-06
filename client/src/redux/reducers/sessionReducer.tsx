import {LOGOUT_USER, SessionActionTypes, SET_SESSION, NOT_AUTHENTICATED} from "../constants/action-types";
import { SESSION_INITIAL_STATE, SessionState} from "../constants/initial-states";

export default function sessionReducer(state: SessionState = SESSION_INITIAL_STATE, action: SessionActionTypes): SessionState {
    switch (action.type) {
        case NOT_AUTHENTICATED:
        case LOGOUT_USER:
            return {...SESSION_INITIAL_STATE}
        case SET_SESSION:
            return {
                ...state,
                userData: action.data
            }
        default:
            return state

    }
}