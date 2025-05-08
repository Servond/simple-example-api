"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FE_URL = exports.SECRET_KEY = exports.PORT = void 0;
require("dotenv/config");
_a = process.env, exports.PORT = _a.PORT, exports.SECRET_KEY = _a.SECRET_KEY, exports.FE_URL = _a.FE_URL;
