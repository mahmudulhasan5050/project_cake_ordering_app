"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('hello from get');
});
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        status: error.status || 500,
        message: error.message
    });
};
app.use(errorHandler);
const PORT = Number(process.env.PORT);
const server = app.listen(PORT, () => {
    console.log(`server is on port ${PORT}`);
});
