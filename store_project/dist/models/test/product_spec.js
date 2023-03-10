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
var products_1 = require("../products");
var database_1 = __importDefault(require("../../database"));
var theproduct = {
    id: 1,
    productname: 'samsung',
    price: 6000
};
var pt = new products_1.productsTable();
describe('products Model', function () {
    describe('Test methods in product model exist', function () {
        it('Test method insert product exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pt.insert).toBeDefined();
                return [2 /*return*/];
            });
        }); });
        it('Test method index product exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pt.index).toBeDefined();
                return [2 /*return*/];
            });
        }); });
        it('Test method show product exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pt.show).toBeDefined();
                return [2 /*return*/];
            });
        }); });
        it('Test method delete product exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pt.delete).toBeDefined();
                return [2 /*return*/];
            });
        }); });
        it('Test method update product exist', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                expect(pt.update).toBeDefined();
                return [2 /*return*/];
            });
        }); });
        beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
            var newproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pt.insert(theproduct)];
                    case 1:
                        newproduct = (_a.sent());
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
                        sql = 'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        _a.sent();
                        conn.release;
                        return [2 /*return*/];
                }
            });
        }); });
        it('Test method insert shoud create product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var theNewUser, ceateNewUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        theNewUser = {
                            id: 2,
                            productname: 'redme',
                            price: 7000
                        };
                        return [4 /*yield*/, pt.insert(theNewUser)];
                    case 1:
                        ceateNewUser = (_a.sent());
                        expect(ceateNewUser).toEqual([
                            {
                                id: 2,
                                productname: 'redme',
                                price: 7000
                            }
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Test method index should get products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pt.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Test method show should get one product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pt.show(1)];
                    case 1:
                        result = (_a.sent());
                        expect(result).toEqual({
                            id: 1,
                            productname: 'samsung',
                            price: 6000
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Test method update should update product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pt.update(1, 'Iphone', 20000)];
                    case 1:
                        result = (_a.sent());
                        expect(result).toEqual({
                            id: 1,
                            productname: 'Iphone',
                            price: 20000
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('Test method delete should delete one product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pt.delete(2)];
                    case 1:
                        result = (_a.sent());
                        expect(result).toBeTruthy;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
