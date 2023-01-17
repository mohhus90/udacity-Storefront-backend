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
var orders_1 = require("../orders");
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var pro = new orders_1.ordersTable();
var insert = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status_1, user_id, neworder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                status_1 = 'active';
                user_id = req.body.user_id;
                return [4 /*yield*/, pro.insert(status_1, user_id)];
            case 1:
                neworder = _a.sent();
                res.json(neworder);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.json(400);
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addproduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quantity, order_id, product_id, addpro, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                quantity = req.body.quantity;
                order_id = req.params.order_id;
                product_id = req.body.product_id;
                return [4 /*yield*/, pro.addproduct(quantity, order_id, product_id)];
            case 1:
                addpro = _a.sent();
                res.json(addpro);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.json(400);
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, pro.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.json(400);
                res.json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleted, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, pro.delete(id)];
            case 1:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json({ err: err_4 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, showed, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, pro.show(id)];
            case 1:
                showed = _a.sent();
                res.json(showed);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json({ err: err_5 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var orderuser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, showed, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = req.params.user_id;
                return [4 /*yield*/, pro.orderuser(user_id)];
            case 1:
                showed = _a.sent();
                res.json(showed);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(400).json({ err: err_6 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var orderproduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product_id, showed, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                product_id = req.params.product_id;
                return [4 /*yield*/, pro.orderproduct(product_id)];
            case 1:
                showed = _a.sent();
                res.json(showed);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(400).json({ err: err_7 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var up = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var status_2, id, user_id, updated, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                status_2 = req.body.status;
                if (status_2 == 'active' || status_2 == 'complete') {
                    return [2 /*return*/, status_2];
                }
                else {
                    res.send('Enter active or complete');
                }
                id = req.params.id;
                user_id = req.body.user_id;
                return [4 /*yield*/, pro.update(id, status_2, user_id)];
            case 1:
                updated = _a.sent();
                res.json(updated);
                return [3 /*break*/, 3];
            case 2:
                err_8 = _a.sent();
                res.status(400).json({ err: err_8 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var orderRoutes = function (app) {
    app.post('/order', auth_middleware_1.default, insert);
    app.post('/order/:id/product', auth_middleware_1.default, addproduct);
    app.get('/order', index);
    app.get('/order/:id', auth_middleware_1.default, show);
    app.get('/order/:user_id', auth_middleware_1.default, orderuser);
    app.get('/order/:product_id', auth_middleware_1.default, orderproduct);
    app.put('/order/:id', auth_middleware_1.default, up);
    app.delete('/order/:id', auth_middleware_1.default, destroy);
};
exports.default = orderRoutes;
