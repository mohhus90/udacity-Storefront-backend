"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_routes_1 = __importDefault(require("./models/Handeler/products_routes"));
var users_routes_1 = __importDefault(require("./models/Handeler/users_routes"));
var orders_routes_1 = __importDefault(require("./models/Handeler/orders_routes"));
var app = (0, express_1.default)();
var address = '127.0.0.1:5000';
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('hello');
});
(0, products_routes_1.default)(app);
(0, users_routes_1.default)(app);
(0, orders_routes_1.default)(app);
app.listen(5000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
