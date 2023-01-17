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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../../config"));
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
var st = new users_1.UsersTable();
var insert = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, newUser, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                result = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    pass: req.body.pass
                };
                return [4 /*yield*/, st.insert(result)];
            case 1:
                newUser = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: newUser }, config_1.default.token);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).json({ err: err_1 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, st.index()];
            case 1:
                users = _a.sent();
                res.json(users);
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
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleted, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, st.delete(id)];
            case 1:
                deleted = _a.sent();
                res.json(deleted);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).json({ err: err_3 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, showed, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                return [4 /*yield*/, st.show(id)];
            case 1:
                showed = _a.sent();
                res.json(showed);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json({ err: err_4 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var up = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, lastname, id, updated, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                firstname = req.body.firstname;
                lastname = req.body.lastname;
                id = req.params.id;
                return [4 /*yield*/, st.update(id, firstname, lastname)];
            case 1:
                updated = _a.sent();
                res.json(updated);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json({ err: err_5 });
                return [2 /*return*/];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authnticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, pass, showed, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                firstname = req.body.firstname;
                pass = req.body.pass;
                return [4 /*yield*/, st.authnticate(firstname, pass)];
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
var userRoutes = function (app) {
    app.post('/user', insert);
    app.get('/user', auth_middleware_1.default, index);
    app.get('/user/:id', auth_middleware_1.default, show);
    app.put('/user/:id', auth_middleware_1.default, up);
    app.delete('/user/:id', auth_middleware_1.default, destroy);
    app.get('/authnticate', auth_middleware_1.default, authnticate);
};
exports.default = userRoutes;