"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = exports.checkIfLoggedIn = exports.createUser = exports.logoutUser = exports.loginUser = exports.loginRoutes = void 0;
const loginRoutes_1 = require("../db/loginRoutes");
const user_1 = require("../models/user");
const helpers_1 = require("../util/helpers");
const { v4: uuid } = require("uuid");
const md5 = require("md5");
const loginRoutes = async (req, res) => {
    res.status(201).send({ message: "Successfully communicated from the back-end" });
};
exports.loginRoutes = loginRoutes;
function sessionChecker(req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).send({ message: "Not logged in" });
    }
}
const getUser = (user) => {
    const retData = {
        profile: helpers_1.retOnlyValidProps(user),
        token: uuid()
    };
    return retData;
};
const saveSessUser = (req, data) => {
    req.session.user = data;
    req.session.save();
};
const loginUser = async (req, res) => {
    try {
        let { user } = req.session;
        if (user) {
            req.session.regenerate((err) => {
                if (err)
                    throw err;
            });
        }
        const { name, password } = req.body;
        await user_1.signIn.validate({ name, password });
        let foundUser = await loginRoutes_1.findUser(name);
        if (!foundUser) {
            return res.status(500).send({ message: "User not found." });
        }
        let hash = md5(password);
        if (hash !== foundUser.password) {
            return res.status(500).send({ message: 'Incorrect password.' });
        }
        const retData = getUser(foundUser);
        saveSessUser(req, retData);
        return res.status(200).send(retData);
    }
    catch (e) {
        return res.status(422).send(helpers_1.parseError(e));
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    try {
        const { user } = req.session;
        if (user) {
            req.session.destroy((err) => {
                if (err)
                    throw err;
                res.clearCookie("goodAppForYou");
                res.status(200).send(user);
            });
        }
        else {
            res.status(422).send({ message: "error: something went wrong, my dude" });
        }
    }
    catch (e) {
        res.status(422).send(helpers_1.parseError(e));
    }
};
exports.logoutUser = logoutUser;
const createUser = async (req, res) => {
    try {
        let { name, password } = req.body;
        await user_1.signUp.validate({ name, password });
        let user = await loginRoutes_1.findUser(name);
        if (user) {
            return res.status(500).send({ message: "A user with that account name already exists." });
        }
        await loginRoutes_1.signupUser({ userID: uuid(), name, password: md5(password) });
        let newUser = await loginRoutes_1.findUser(name);
        if (!newUser) {
            return res.status(500).send({ message: "User not found." });
        }
        const retData = getUser(newUser);
        saveSessUser(req, retData);
        return res.status(201).send(retData);
    }
    catch (e) {
        return res.status(422).send(helpers_1.parseError(e));
    }
};
exports.createUser = createUser;
const checkIfLoggedIn = async (req, res) => {
    try {
        const { user } = req.session;
        if (!user) {
            req.session.destroy((err) => {
                if (err)
                    throw err;
                res.clearCookie("goodAppForYou");
                res.status(200).send(user);
            });
        }
        else {
            res.status(200).send(user);
        }
    }
    catch (e) {
        res.status(422).send(helpers_1.parseError(e));
    }
};
exports.checkIfLoggedIn = checkIfLoggedIn;
const setRoutes = (app) => {
    app.post("/login-user", exports.loginUser);
    app.post("/create-user", exports.createUser);
    app.delete("/logout-user", exports.logoutUser);
    app.get("/session-check", sessionChecker, exports.checkIfLoggedIn);
};
exports.setRoutes = setRoutes;
