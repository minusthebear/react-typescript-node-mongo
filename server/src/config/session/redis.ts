import session from 'express-session';
import {RedisError} from "redis";
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const redisClient = redis
    .createClient({
        host: 'localhost',
        port: 6379,
        password: '',
        db: 0
    })
    .on('error', (err: RedisError) => {
        console.log(err);
        throw err;
    })

redisClient.keys("sess:*", (error: Error | null, keys: string[]) => {
    console.log("Number of active sessions: ", keys.length);
    console.log(keys)
})

const redisSession = session({

// @ts-ignore
    key: 'session.sid',
    secret: '',
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
})

export { redisSession }
