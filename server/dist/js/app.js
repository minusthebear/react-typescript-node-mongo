"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const redis_1 = require("./config/session/redis");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//@ts-ignore
const compression_1 = __importDefault(require("compression"));
require("./db/connect-mongodb");
const app = express_1.default();
const PORT = process.env.PORT || 4000;
app.disable('x-powered-by');
app.use(compression_1.default());
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['set-cookie']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
// extended: true
}));
app.use(redis_1.redisSession);
app.set('trust proxy', 1);
app.use(routes_1.default);
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
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
