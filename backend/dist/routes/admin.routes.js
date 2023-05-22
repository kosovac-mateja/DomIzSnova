"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const adminRuter = express_1.default.Router();
adminRuter.get('/dohvatiSve', (req, res) => new admin_controller_1.AdminController().dohvatiSve(req, res));
exports.default = adminRuter;
//# sourceMappingURL=admin.routes.js.map