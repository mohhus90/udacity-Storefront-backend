"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../../config"));
var author = function (req, res, next) {
    var authorization = req.get('authorization');
    var token = authorization.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, config_1.default.token);
        next();
    }
    catch (err) {
        console.log(token);
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
exports.default = author;
