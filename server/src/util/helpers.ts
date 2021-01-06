import {IUser} from "../models/user";
import {Profile} from "../types/profile";

export const parseError = (err: any) => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};
export const sessionizeUser = (user: IUser): Profile => {
    return retOnlyValidProps(user);
}

export const retOnlyValidProps = (user: IUser): Profile => {
    const {name, userID} = user
    return {name, userID}
}