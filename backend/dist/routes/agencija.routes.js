"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agencija_controller_1 = require("../controllers/agencija.controller");
const agencijaRouter = express_1.default.Router();
agencijaRouter
    .route('/registracija')
    .post((req, res) => new agencija_controller_1.AgencijaController().registracija(req, res));
exports.default = agencijaRouter;
//# sourceMappingURL=agencija.routes.js.map