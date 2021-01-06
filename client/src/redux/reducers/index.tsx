import {combineReducers} from "redux";
import sessionReducer from "./sessionReducer"
import signupReducer from "./signupReducer"

const rootReducer = combineReducers({
    signup: signupReducer,
    session: sessionReducer
})

export default rootReducer;