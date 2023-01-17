"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../users");
var products_1 = require("../products");
var orders_1 = require("../orders");
var database_1 = __importDefault(require("../../database"));
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var request = (0, supertest_1.default)(server_1.default);
var theUser = {
    id: 1,
    firstname: 'mohamed1',
    lastname: 'elhussieny1',
    pass: 'pass1234'
};
var ut = new users_1.UsersTable();
var authuser;
var theproduct = {
    id: 1,
    productname: 'samsung',
    price: 6000
};
var theOrder = {
    id: 1,
    status: 'active',
    user_id: 1,
};
var ot = new orders_1.ordersTable();
var pt = new products_1.productsTable();
var toke = '';
var secrettoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzIjoiJDJiJDEwJHA5YXRQSmNWSU9YaExiMDFUdkZIZnVYVWIuNUU3bGU3cU52S3hhTVZYcXZiUmVlOGpVTHB1IiwiaWQiOjJ9XSwiaWF0IjoxNjczNTQzNzk0fQ.U7CtNVUjqmVWcGK5l271g4Fidhrzid3Z-zChezKQwgY';
describe('orders Routes Model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, usertoken, newproduct, newuorder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.post('/user').send({
                        d: 2,
                        firstname: 'mohamed2',
                        lastname: 'elhussieny2',
                        pass: 'pass1234'
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    usertoken = res.body;
                    toke = usertoken;
                    return [4 /*yield*/, pt.insert(theproduct)];
                case 2:
                    newproduct = (_a.sent());
                    return [4 /*yield*/, ot.insert('active', 1)];
                case 3:
                    newuorder = (_a.sent());
                    newproduct;
                    newuorder;
                    console.log(newproduct);
                    console.log();
                    return [4 /*yield*/, ut.authnticate(theUser.firstname, theUser.pass)];
                case 4:
                    authuser = _a.sent();
                    spyOn(ot, 'index').and.returnValue(Promise.resolve([
                        {
                            id: 1,
                            status: 'active',
                            user_id: 1,
                        }
                    ]));
                    spyOn(ot, 'insert').and.returnValue(Promise.resolve([
                        {
                            user_id: 1,
                        }
                    ]));
                    spyOn(ot, 'delete').and.returnValue(Promise.resolve(1));
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var conn, sql;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    conn = _a.sent();
                    sql = 'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
                    return [4 /*yield*/, conn.query(sql)];
                case 2:
                    _a.sent();
                    conn.release;
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Test orders Route', function () {
        console.log(authuser === null || authuser === void 0 ? void 0 : authuser.pass);
        it('Test api it shoud get all orders', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/order')];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Test api it shoud create order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/order')
                            .set('Authorization', 'Bearer ' + toke)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Test api it shoud delete order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete('/order/2')
                            .set('Authorization', 'Bearer ' + toke)];
                    case 1:
                        res = _a.sent();
                        expect(res.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
