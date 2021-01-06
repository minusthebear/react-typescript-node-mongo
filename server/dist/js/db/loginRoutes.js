"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = exports.findUser = void 0;
const user_1 = require("../models/user");
// const getCollection = async (str: string) => {
//     let db = await connectDB();
//     return db.collection(str);
// }
async function signupUser(user) {
    return await user_1.User.create(user);
}
exports.signupUser = signupUser;
async function findUser(name) {
    return user_1.User.findOne({ name });
}
exports.findUser = findUser;
