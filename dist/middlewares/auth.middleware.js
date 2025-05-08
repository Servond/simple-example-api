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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = VerifyToken;
exports.EOGuard = EOGuard;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
function VerifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                throw new Error("Unauthorized");
            const verifyUser = (0, jsonwebtoken_1.verify)(token, String(config_1.SECRET_KEY));
            if (!verifyUser)
                throw new Error("Invalid Token");
            req.user = verifyUser;
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
function EOGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "Event Organizer")
                throw new Error("Restricted");
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
