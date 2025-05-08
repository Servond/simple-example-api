"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const port = config_1.PORT || 8080;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.FE_URL
}));
app.use(express_1.default.json());
app.use("/api/auth", auth_router_1.default);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
exports.default = app;
