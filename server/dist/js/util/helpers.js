"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retOnlyValidProps = exports.sessionizeUser = exports.parseError = void 0;
const parseError = (err) => {
    if (err.isJoi)
        return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};
exports.parseError = parseError;
const sessionizeUser = (user) => {
    return exports.retOnlyValidProps(user);
};
exports.sessionizeUser = sessionizeUser;
const retOnlyValidProps = (user) => {
    const { name, userID } = user;
    return { name, userID };
};
exports.retOnlyValidProps = retOnlyValidProps;
