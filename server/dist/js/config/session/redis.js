"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisSession = void 0;
const express_session_1 = __importDefault(require("express-session"));
const redis = require('redis');
const redisStore = require('connect-redis')(express_session_1.default);
const redisClient = redis
    .createClient({
    host: 'localhost',
    port: 6379,
    password: '',
    db: 0
})
    .on('error', (err) => {
    console.log(err);
    throw err;
});
redisClient.keys("sess:*", (error, keys) => {
    console.log("Number of active sessions: ", keys.length);
    console.log(keys);
});
const redisSession = express_session_1.default({
    // @ts-ignore
    key: 'session.sid',
    secret: 'i-l0v3-l@mp',
    resave: false,
    saveUninitialized: false,
    name: 'goodAppForYou',
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: false,
        maxAge: 300000 //Equal to 5redis minutes
    },
    store: new redisStore({ client: redisClient })
});
exports.redisSession = redisSession;
