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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = RegisterService;
exports.LoginService = LoginService;
exports.GetAllService = GetAllService;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
function GetAllService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield prisma_1.default.user.findMany();
        }
        catch (err) {
            throw err;
        }
    });
}
function FindUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.default.user.findFirst({
                select: {
                    email: true,
                    first_name: true,
                    last_name: true,
                    password: true,
                    role: {
                        select: {
                            name: true,
                        },
                    },
                },
                where: {
                    email,
                },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function RegisterService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isExist = yield FindUserByEmail(param.email);
            if (isExist)
                throw new Error("Email sudah terdaftar");
            yield prisma_1.default.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const salt = (0, bcrypt_1.genSaltSync)(10);
                const hashedPassword = yield (0, bcrypt_1.hash)(param.password, salt);
                let user = yield t.user.create({
                    data: {
                        first_name: param.first_name,
                        last_name: param.last_name,
                        email: param.email,
                        isVerified: false,
                        password: hashedPassword,
                        roleId: 1,
                    },
                });
                return user;
            }));
        }
        catch (err) {
            throw err;
        }
    });
}
function LoginService(param) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield FindUserByEmail(param.email);
            if (!user)
                throw new Error("Email tidak terdaftar");
            const checkPass = yield (0, bcrypt_1.compare)(param.password, user.password);
            if (!checkPass)
                throw new Error("Password Salah");
            const payload = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role.name,
            };
            const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "1h" });
            return { user: payload, token };
        }
        catch (err) {
            throw err;
        }
    });
}
