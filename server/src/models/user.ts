import {Model, Document, Schema, model} from "mongoose"
import { compareSync, hashSync } from "bcryptjs"
import * as Joi from "@hapi/joi"
import {LoginCreds} from "../types/interfaces";

export const PASSWORD_REGEX = /(^[a-z0-9]{8,}$)/i
export const USERNAME_REGEX = /(^[a-z0-9]{8,}$)/i

const build = (attr: IUser) => new User(attr)
const username = Joi.string().regex(USERNAME_REGEX).required()
const password = Joi.string().regex(PASSWORD_REGEX).required()

interface IUser extends LoginCreds {
    userID:string
}

interface UserModelInterface extends Model<UserDoc> {
    build(attr: IUser): UserDoc
}

interface UserDoc extends Document, IUser {}

const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    userID: {
        type:String,
        required:true
    }
})

userSchema.pre('save', function () {
    if (this.isModified('password')) {
        //@ts-ignore
        this.password = hashSync(this.password, 10);
    }
});

userSchema.statics.doesNotExist = async function (field: string) {
    return await this.where(field).countDocuments() === 0;
};

userSchema.methods.comparePasswords = function (password: string) {
    return compareSync(password, this.password);
};

userSchema.statics.build = (attr: IUser) => build(attr)

const User = model<UserDoc, UserModelInterface>("User", userSchema)

User.build({
    name:"name",
    password: "password",
    userID: "userID"
})

const signUp = Joi.object().keys({
    name: username,
    password
})

const signIn = Joi.object().keys({
    name: username,
    password
})

export {User, IUser, signIn, signUp}