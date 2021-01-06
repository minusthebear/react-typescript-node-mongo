import {findUser, signupUser} from "../db/loginRoutes"
import {NextFunction, Request, Response, Router} from "express-serve-static-core";
import {Data} from "../types/profile";
import {IUser, signIn, signUp} from "../models/user";
import {parseError, retOnlyValidProps} from "../util/helpers";
import {LoginCreds} from "../types/interfaces";
import {Session} from "express-session";
const { v4: uuid } = require("uuid")
const md5 = require("md5")

export const loginRoutes = async (req: Request, res:Response): Promise<void> => {
    res.status(201).send({message: "Successfully communicated from the back-end"})
}

interface SessionWithUser extends Session {
    user?: Data
}

type SessionRequest = Request & {
    session: SessionWithUser,
    sessionID: string
}

function sessionChecker(req: SessionRequest, res: Response, next: NextFunction) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send({message:"Not logged in"});
    }
}

const getUser = (user: IUser): Data => {
    const retData: Data = {
        profile: retOnlyValidProps(user),
        token: uuid()
    };
    return retData
}

const saveSessUser = (req: SessionRequest, data: Data) => {
    req.session.user = data
    req.session.save();
}

export const loginUser = async (req: SessionRequest, res:Response): Promise<Response> => {
    try {
        let {user}: SessionWithUser = req.session

        if (user) {
            req.session.regenerate((err: any) => {
                if (err) throw err
            })
        }
        const {name, password}: LoginCreds = req.body
        await signIn.validate({name, password})
        let foundUser = await findUser(name)

        if (!foundUser) {
            return res.status(500).send({message:"User not found."})
        }

        let hash = md5(password)

        if (hash !== foundUser.password) {
            return res.status(500).send({message: 'Incorrect password.'})
        }

        const retData: Data = getUser(foundUser)
        saveSessUser(req, retData)
        return res.status(200).send(retData)
    } catch (e) {
        return res.status(422).send(parseError(e))
    }
}

export const logoutUser = async (req: SessionRequest, res:Response): Promise<void> => {
    try {
        const {user}: SessionWithUser = req.session

        if (user) {
            req.session.destroy((err: any) => {
                if (err) throw err
                res.clearCookie("goodAppForYou")
                res.status(200).send(user)
            })
        } else {
            res.status(422).send({message: "error: something went wrong, my dude"})
        }
    } catch (e) {
        res.status(422).send(parseError(e))
    }
}


export const createUser = async (req: SessionRequest, res:Response): Promise<Response> => {
    try {

        let { name, password } = req.body;
        await signUp.validate({name, password})

        let user = await findUser(name)
        if (user) {
            return res.status(500).send({message:"A user with that account name already exists."})
        }

        await signupUser({userID: uuid(), name, password: md5(password)})

        let newUser = await findUser(name)
        if (!newUser) {
            return res.status(500).send({message:"User not found."})
        }

        const retData: Data = getUser(newUser)
        saveSessUser(req, retData)
        return res.status(201).send(retData)
    } catch (e) {
        return res.status(422).send(parseError(e))
    }
}

export const checkIfLoggedIn = async (req: SessionRequest, res:Response): Promise<void> => {
    try {
        const {user}: SessionWithUser = req.session
        if (!user) {
            req.session.destroy((err: any) => {
                if (err) throw err
                res.clearCookie("goodAppForYou")
                res.status(200).send(user)
            })
        } else {
            res.status(200).send(user)
        }
    } catch (e) {
        res.status(422).send(parseError(e))
    }
}

export const setRoutes = (app: Router): void => {
    app.post("/login-user", loginUser)
    app.post("/create-user", createUser)
    app.delete("/logout-user", logoutUser)
    app.get("/session-check", sessionChecker, checkIfLoggedIn)
}