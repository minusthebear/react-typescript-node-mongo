import express, { Express } from 'express'
import cors from 'cors'
import todoRoutes from './routes'
import {redisSession} from "./config/session/redis"
import cookieParser from "cookie-parser"
import fs from "fs"
import https from "https"
//@ts-ignore
import compression from "compression"
require("./db/connect-mongodb")

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.disable('x-powered-by')
app.use(compression())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie']
}))
app.use(express.json())
app.use(express.urlencoded({
    // extended: true
}))
app.use(redisSession)
app.set('trust proxy', 1)
app.use(todoRoutes)
//
// https
//     .createServer(
//         {
//             key: fs.readFileSync('server.key'),
//             cert: fs.readFileSync('server.cert')
//         },
//         app
//     )
//     .listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`)
//     });
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)