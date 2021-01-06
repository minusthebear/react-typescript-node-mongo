"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = exports.User = exports.USERNAME_REGEX = exports.PASSWORD_REGEX = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const Joi = __importStar(require("@hapi/joi"));
exports.PASSWORD_REGEX = /(^[a-z0-9]{8,}$)/i;
exports.USERNAME_REGEX = /(^[a-z0-9]{8,}$)/i;
const build = (attr) => new User(attr);
const username = Joi.string().regex(exports.USERNAME_REGEX).required();
const password = Joi.string().regex(exports.PASSWORD_REGEX).required();
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
});
userSchema.pre('save', function () {
    if (this.isModified('password')) {
        //@ts-ignore
        this.password = bcryptjs_1.hashSync(this.password, 10);
    }
});
userSchema.statics.doesNotExist = async function (field) {
    return await this.where(field).countDocuments() === 0;
};
userSchema.methods.comparePasswords = function (password) {
    return bcryptjs_1.compareSync(password, this.password);
};
userSchema.statics.build = (attr) => build(attr);
const User = mongoose_1.model("User", userSchema);
exports.User = User;
User.build({
    name: "name",
    password: "password",
    userID: "userID"
});
const signUp = Joi.object().keys({
    name: username,
    password
});
exports.signUp = signUp;
const signIn = Joi.object().keys({
    name: username,
    password
});
exports.signIn = signIn;
