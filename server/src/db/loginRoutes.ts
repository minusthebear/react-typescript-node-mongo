import {IUser, User} from "../models/user";
import {Profile} from "../types/profile";

// const getCollection = async (str: string) => {
//     let db = await connectDB();
//     return db.collection(str);
// }

async function signupUser(user:IUser): Promise<IUser> {
    return await User.create(user);
}

async function findUser(name: string): Promise<IUser | null> {
    return User.findOne({ name });
}

export {
    findUser,
    signupUser
}